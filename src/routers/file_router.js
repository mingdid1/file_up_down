const router = require("express").Router();

// multer: 파일을 관리해준다
// dest : 파일을 저장할 폴더 위치(← 최상위 바로 아래 위치하도록 만들어줘야함)
const  multer = require("multer");
//const upload = multer({dest : "upload_file"});

const stg = multer.diskStorage ({
    destination : (req, file, cb) =>{
        console.log("=== dest ===");
        cb( null, "upload_file");
    },
    filename : (req, file, cb)=> {
        console.log("=== filename ===");
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const f_Filter = (req, file, cb)=> {
    console.log("=== filter ===");
    // mimetype을 '/'를 기준으로 인덱스 형식으로 
    const type = file.mimetype.split("/")[0];
    console.log("type : ", type);
    if(type === "image"){
        cb(null, true);
    }else {
        // req = {fileValidation : "이미지~~~~"}
        req.fileValidation = "이미지만 저장하세여~~";
        cb(null, false);
    }
}

const upload = multer({storage : stg, fileFilter : f_Filter});

const fileCtrl = require("../controller/file_controller");

router.get("/", fileCtrl.views.index);
router.get("/list", fileCtrl.views.list);

router.get("/download/:fileName", fileCtrl.views.download);

router.get("/deleteFile/:fileName", fileCtrl.process.deleteFile);

router.get("/modify_form/:fileName", fileCtrl.views.modifyForm);


// upload.single(): 단일 파일을 업로드하겠다는 의미
router.post("/upload", upload.single("file_name"), fileCtrl.process.upload);
router.post("/modify", upload.single("newFileName"), fileCtrl.process.modify);

module.exports = router;