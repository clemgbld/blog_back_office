import { createStorageService, inMemoryStorage } from "../storage-service";

describe("storage service", () => {²  
  it("should be able to stock item in the storage", () => {
    const storage = createStorageService(inMemoryStorage());

    storage.stockItem("myCat", "Tom");

    expect(storage.getItem("myCat")).toBe("Tom");
  });

  it("can preload the storage", () => {
    const storage = createStorageService(
      inMemoryStorage({
        myCat: "Tom",
      })
    );

    expect(storage.getItem("myCat")).toBe("Tom");
  });

  it("can remove specific item from the storage", () => {
    const storage = createStorageService(
      inMemoryStorage({
        myCat: "Tom",
      })
    );

    storage.removeItem("myCat");

    expect(storage.getItem("myCat")).toBe(undefined);
  });

  it("should be able to remove all the items of the storage", () => {
    const storage = createStorageService(
      inMemoryStorage({
        myCat: "Tom",
        myDog: "Dog",
      })
    );

    storage.clear();

    expect(storage.getItem("myCat")).toBe(undefined);

    expect(storage.getItem("myDog")).toBe(undefined);
  });
});
