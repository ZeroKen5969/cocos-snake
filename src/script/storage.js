const StoreKey = {
    MaxLevel: "MaxLevel",
    PenetrateMaxLevel: "PenetrateMaxLevel",
};

class StorageUtils {
    static #_instance = new StorageUtils();

    static get instance() {
        return StorageUtils.#_instance;
    }

    trySetMaxLevel(level) {
        const lv = cc.sys.localStorage.getItem(StoreKey.MaxLevel);
        if (level > lv) {
            cc.sys.localStorage.setItem(StoreKey.MaxLevel, level);
            return true;
        }
        return false;
    }

    isExistNormalRecord() {
        return !!cc.sys.localStorage.getItem(StoreKey.MaxLevel)
    }

    get maxLevel() {
        return cc.sys.localStorage.getItem(StoreKey.MaxLevel)
    }

    trySetPenetrateMaxLevel(level) {
        const lv = cc.sys.localStorage.getItem(StoreKey.PenetrateMaxLevel);
        if (level > lv) {
            cc.sys.localStorage.setItem(StoreKey.PenetrateMaxLevel, level);
            return true;
        }
        return false;
    }

    isExistSpecialRecord() {
        return !!cc.sys.localStorage.getItem(StoreKey.PenetrateMaxLevel)
    }

    get penetrateMaxLevel() {
        return cc.sys.localStorage.getItem(StoreKey.PenetrateMaxLevel)
    }
}