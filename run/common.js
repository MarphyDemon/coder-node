const fs = require("fs");
const path = require("path");

class FileHandle {
    // 获取制定路径下的所有文件
    static async getAllFiles(root) {
        var result = [],
        files = fs.readdirSync(root);
        files.forEach(function(file) {
            var pathname = root + "/" + file,
            stat = fs.lstatSync(pathname);
            if (stat === undefined) return;

            // 不是文件夹就是文件
            if (!stat.isDirectory()) {
                result.push(pathname);
            // 递归自身
            } else {
                result = result.concat(getAllFiles(pathname));
            }
        });
        return result;
    }

    //检查文件是否存在
    static async checkExistFile(fileList, filePath){
        console.log("check exist file...")
        var isExist = false;
        fileList.then((arr) => {
            arr.forEach(element => {
                if(element = filePath){
                    isExist = true;
                }
            });
        })
        console.log("文件是否存在:",isExist)
        return isExist;
    }

    // 创建目录
    static async createFolder(path){
        console.log("create folder")
        fs.mkdir(path,function(error){
            if(error){
                console.log(error,"createFolder");
                return false;
            }
        })
    }

    // 创建文件
    static async createFile(filePath){
        console.log("create file...")
        fs.open(filePath, "w", (err) => {
            if (err) console.log(err, "createfile");
        });
    }

    // 写文件
    static async writeFile(filePath,code){
        console.log("write file...")
        fs.appendFile(filePath, code, function(err) {
            if (err) console.log(err,"writeFile");
        });
    }

    // 删除文件
    static async deleteFile(url,name){
        console.log(url,name)
        console.log("delete file...")
        var files = [];
        if(fs.existsSync(url)) {    //判断给定的路径是否存在
            files = fs.readdirSync(url);    //返回文件和子目录的数组
            files.forEach(function(file,index){
                var curPath = path.join(url,file);
                if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                    deleteFile(curPath,name);
                } else {   
                    if(file.indexOf(name)>-1){    //是指定文件，则删除
                        fs.unlinkSync(curPath);
                        console.log("已删除文件："+curPath);
                    }
                }  
            });
        }else{
            console.log("给定的路径不存在！");
        }
    }

    // 删除文件夹
    static async deleteFolder(path) {
        console.log("delete folder");
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFolder(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}

    // 获取制定路径下的文件及文件夹
    var getAllFolersAndFiles = (function(){
        function iterator(url, folders, files){
            var stat = fs.statSync(url);
            if(stat.isDirectory()){
                folders.unshift(url);//收集目录
                inner(url,folders, files);
            }else if(stat.isFile()){
                files.unshift(url);//收集文件
            }
        }
        function inner(path,folders,files){
            var arr = fs.readdirSync(path);
            for(var i = 0, el ; el = arr[i++];){
                iterator(path+"/"+el,folders,files);
            }
        }
        return function(dir){
            var folders = [], files = [];
            try{
                iterator(dir,folders,files);
            }catch(e){
            }finally{
                return {
                    folders : folders,
                    files   : files
                }
            }
        }
    })()

module.exports = FileHandle;