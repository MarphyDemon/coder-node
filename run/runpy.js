const cp = require("child_process");
const common = require("./common");

class RunPython {
  // 运行python
  static runFile(filePath) {
    console.log(`running ${filePath}`)
    return new Promise((resolve, reject) => {
      cp.exec(`python3 ${filePath}`, (err, stdout, stderr) => {
        resolve({err, stdout, stderr});
      });
    });
  }

  // 创建到运行文件
  static async createToRunFile(path, filePath, code) {
    console.log("Create file to run file")
    let createFolder = await common.createFolder(path);
    if(createFolder){
      await common.createFile(filePath);
      await common.writeFile(filePath, code);
      let res = await RunPython.runFile(filePath);
      if(res){
        common.deleteFolder(path);
      }
      return res;
    }
  }

  // 运行 文件 主函数
  static async runpy(path, fileName, filePath, code) {
    var backResult;
    let fileList = common.getAllFiles(path);
    if (await common.checkExistFile(fileList, filePath)) {
      common.deleteFile(path, fileName);
      backResult = this.createToRunFile(path, filePath, code);
    } else {
      backResult = this.createToRunFile(path, filePath, code);
    }
    return backResult;
  }
  static async main(name, questionTitle, code){
    let path = `./code/${name}`;
    let fileName = `${questionTitle}.py`;
    let filePath = `./code/${name}/${questionTitle}.py`;
    let lastResult;
    lastResult = await this.runpy(path, fileName, filePath, code);
    return lastResult;
  }
}

module.exports = RunPython;
