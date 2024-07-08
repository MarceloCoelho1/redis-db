export class RedisCache {
  private cache: Map<string, Map<string, Map<string, any>>>;
  private readonly limit: number;

  constructor(limit: number = 50) {
    this.cache = new Map();
    this.limit = limit;
  }

  set(secretKey: string, dbUrl: string, key: string, value: any): boolean {
    if (!this.cache.has(secretKey)) {
      this.cache.set(secretKey, new Map());
    }

    const userCache = this.cache.get(secretKey)!;

    if (!userCache.has(dbUrl)) {
      userCache.set(dbUrl, new Map());
    }

    const dbCache = userCache.get(dbUrl)!;

    if (dbCache.size >= this.limit) {
      return false; 
    }

    dbCache.set(key, value);
    return true;
  }

  get(secretKey: string, dbUrl: string, key: string): any | null {
    const userCache = this.cache.get(secretKey);
    if (userCache) {
      const dbCache = userCache.get(dbUrl);
      if (dbCache && dbCache.has(key)) {
        return dbCache.get(key);
      }
    }
    return null;
  }

  delete(secretKey: string, dbUrl: string, key: string): boolean {
    const userCache = this.cache.get(secretKey);
    if (userCache) {
      const dbCache = userCache.get(dbUrl);
      if (dbCache && dbCache.has(key)) {
        dbCache.delete(key);
        if (dbCache.size === 0) {
          userCache.delete(dbUrl);
        }
        if (userCache.size === 0) {
          this.cache.delete(secretKey);
        }
        return true;
      }
    }
    return false;
  }

  has(secretKey: string, dbUrl: string, key: string): boolean {
    const userCache = this.cache.get(secretKey);
    if (userCache) {
      const dbCache = userCache.get(dbUrl);
      return dbCache ? dbCache.has(key) : false;
    }
    return false;
  }

  getDbSize(secretKey: string, dbUrl: string): number {
    const userCache = this.cache.get(secretKey);
    if (userCache) {
      const dbCache = userCache.get(dbUrl);
      return dbCache ? dbCache.size : 0;
    }
    return 0;
  }
}
