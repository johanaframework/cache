/// <reference path="./../../references.ts" />
/**
* Johana Cache provides a common interface to a variety of caching engines. Tags are
* supported where available natively to the cache system. Johana Cache supports multiple
* instances of cache engines through a grouped singleton pattern.
*
* ### Supported cache engines
*
* *  File
* *  [Memcache](http://memcached.org/)
* *  [Memcached-tags](http://code.google.com/p/memcached-tags/)
* *  [SQLite](http://www.sqlite.org/)
*/
var JohanaCache = (function () {
    /**
    * Ensures singleton pattern is observed, loads the default expiry
    * @param config
    */
    function JohanaCache(config) {
        this._config = [];
        this._config = config;
    }
    JohanaCache.instance = /**
    * Creates a singleton of a Johana Cache group. If no group is supplied
    * the _default_ cache group is used.
    *
    *     // Create an instance of the default group
    *     var group = Cache.instance();
    *
    *     // Create an instance of a group
    *     var fooGroup = Cache.instance('foo');
    *
    *     // Access an instantiated group directly
    *     var fooGroup = Cache.instances['default'];
    *
    * @param   string  $group  the name of the cache group to use [Optional]
    * @return  Cache
    * @throws  Cache_Exception
    */
    function (group) {
        if (typeof group === "undefined") { group = null; }
        if (group === null) {
            // Use the default setting
            group = this._default;
        }

        if (this.instances[group] !== undefined) {
            // Return the current group if initiated already
            return this.instances[group];
        }

        //$config = Kohana::$config->load('cache');
        //        if ( ! $config->offsetExists($group))
        //        {
        //            throw new Cache_Exception(
        //                'Failed to load Kohana Cache group: :group',
        //                array(':group' => $group)
        //        );
        //        }
        //        $config = $config->get($group);
        // Create a new cache type instance
        var cache = new CacheFile(['a', 'b', 'c']);

        this.instances[group] = cache;

        // Return the instance
        return this.instances[group];
    };
    JohanaCache.DEFAULT_EXPIRE = 3600;

    JohanaCache._default = 'file';

    JohanaCache.instances = [];
    return JohanaCache;
})();
//# sourceMappingURL=Cache.js.map
