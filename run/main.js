const runPy = require("./runpy");
async function getStockPriceByName() {
  return await runPy.runpy(
    "ldd",
    "two",
    `
def LetterCapitalize(str):
    arr = []
    strArr = str.split(" ")
    for i in strArr:
        a = i.capitalize()
        arr.append(a)
    newStr = " ".join(arr)
    return newStr
print(LetterCapitalize("Hello World!!!"))
    `
  );
}

getStockPriceByName().then(function(result) {
  console.log("result->", result);
});
// (async () => {
//   let aa = await runPy.runpy(
//         "ldd",
//         "two",
//         `
// def LetterCapitalize(str):
//     arr = []
//     strArr = str.split(" ")
//     for i in strArr:
//         a = i.capitalize()
//         arr.append(a)
//     newStr = " ".join(arr)
//     return newStr
// print(LetterCapitalize("Hello World!!!"))
//         `
//       )
//   console.log(aa)
// })()

