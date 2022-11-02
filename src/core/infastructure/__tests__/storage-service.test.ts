import { createStorageService, nullStorage } from "../storage-service";

describe("storage service", () => {
  it("should be able to stock item in the storage", () => {
    const storage = createStorageService(nullStorage());

    storage.stockItem("myCat", "Tom");

    expect(storage.getItem("myCat")).toBe("Tom");
  });

  it("can preload the storage", () => {
    const storage = createStorageService(
      nullStorage({
        myCat: "Tom",
      })
    );

    expect(storage.getItem("myCat")).toBe("Tom");
  });

  it("can remove specific item from the storage", () => {
    const storage = createStorageService(
      nullStorage({
        myCat: "Tom",
      })
    );

    storage.removeItem("myCat");

    expect(storage.getItem("myCat")).toBe(undefined);
  });

  it("should be able to remove all the items of the storage", () => {
    const storage = createStorageService(
      nullStorage({
        myCat: "Tom",
        myDog: "Dog",
      })
    );

    storage.clear();

    expect(storage.getItem("myCat")).toBe(undefined);

    expect(storage.getItem("myDog")).toBe(undefined);
  });

  it.todo("clear memo when all items are removed");
});
