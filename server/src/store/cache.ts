import { LRUCache } from "lru-cache";

/*
 * This class defines a cache which may or may not be used in our system for storing data
 */

const options = {
  max: 500,
  dispose: (value: any, key: String) => {
    // For test purposes
    console.log(`removing key ${key} from cache`);
  },
  allowStale: true,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
};

const cache = new LRUCache(options);

export default cache;
