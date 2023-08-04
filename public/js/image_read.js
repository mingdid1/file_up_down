function readURL(input){
    console.log(input);
    // 파일에 대한 정보
    const file = input.files[0];
    console.log(file);
    if(file != ""){
        const reader = new FileReader();
        reader.readAsDataURL( file );
        reader.onload = (e)=> {
            console.log( e.target.result );
            document.querySelector("#preview").src = e.target.result;
        }
    }
}