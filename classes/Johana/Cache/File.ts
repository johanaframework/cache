/// <reference path="./../../../references.ts" />

class JohanaCacheFile extends Cache {

    /**
     * Creates a hashed filename based on the string. This is used
     * to create shorter unique IDs for each cache filename.
     *
     * @param id
     * @returns {string}
     */
    private static filename(id:string):string {
        var crypto = require('crypto'),
            sha1 = crypto.createHash('sha1');
        return sha1.update(id).digest('hex') + '.cache';
    }

    /**
     * @var  {string}   the caching directory
     */
    private _cache_dir;

    constructor(config:Array)
    {
        super(config);

    }

    public get(id, def = null, )
    {
        var filename = this.filename(this._sanitize_id(id));
        var directory = this._resolve_directory(filename);

        // Wrap operations in try/catch to handle notices
        try
        {
            // Open file
            $file = new SplFileInfo($directory.$filename);

            // If file does not exist
            if ( ! $file->isFile())
            {
                // Return default value
                return $default;
            }
        else
            {
                // Open the file and parse data
                $created  = $file->getMTime();
                $data     = $file->openFile();
                $lifetime = $data->fgets();

                // If we're at the EOF at this point, corrupted!
                if ($data->eof())
                {
                    throw new Cache_Exception(__METHOD__.' corrupted cache file!');
                }

                $cache = '';

                while ($data->eof() === FALSE)
                {
                    $cache .= $data->fgets();
                }

                // Test the expiry
                if (($created + (int) $lifetime) < time())
                {
                    // Delete the file
                    $this->_delete_file($file, NULL, TRUE);
                    return $default;
                }
            else
                {
                    return unserialize($cache);
                }
            }

        }
        catch (ErrorException $e)
        {
            // Handle ErrorException caused by failed unserialization
            if ($e->getCode() === E_NOTICE)
            {
                throw new Cache_Exception(__METHOD__.' failed to unserialize cached object with message : '.$e->getMessage());
            }

            // Otherwise throw the exception
            throw $e;
        }
    }

}
