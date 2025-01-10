let fileInput = document.getElementById('filepicker');
let innerImage = document.querySelector(".inner-upload-image");
let image = null;
let inputImage = document.getElementById("input-image");
let icon = document.querySelector('#icon');
let span = document.querySelector('span');
let url = null;

let UploadBtn = document.querySelector("#upload-btn");

let OriginalImg = document.querySelector(".resultimg1 img")

let generatedImg =  document.querySelector(".resultimg2 img")

let style2=  document.querySelector(".style2")

let resultPage = document.querySelector(".result")

let loading = document.querySelector("#loading");

let downloadBtn = document.querySelector("#download")

let resetBtn = document.querySelector("#reset")

function handleUpload() {
    const ApiKey = "72EYF4UwcKVURTrv6ohUHjmc";
    const formdata = new FormData();
    formdata.append('image_file', image);
    formdata.append('size', 'auto');

    fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": ApiKey },
        body: formdata,
    })
    .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.blob();
    })
    .then((blob) => {
         loading.style.display = "block"
        style2.style.display = "none"
        resultPage.style.display = "flex"
        url = URL.createObjectURL(blob);
        generatedImg.src = url
      
    })
    .catch((error) => {
        console.error("Error during API call:", error);
        alert("No response from the server. Please check your API key and connection.");
    });
}

innerImage.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    image = fileInput.files[0];
    if (!image) return;

    let reader = new FileReader();
    reader.onload = (e) => {
        console.log("File loaded:", e.target.result);
        inputImage.src = e.target.result;
        inputImage.style.display = "block";
        icon.style.display = "none";
        span.style.display = "none";

        OriginalImg.src = e.target.result;
    };

    reader.readAsDataURL(image);
});

UploadBtn.addEventListener("click", () => { handleUpload();
        loading.style.display = "block"
 });


 function download() {
        fetch(url)
        .then(res => res.blob())
        .then(file=>{
                let a = document.createElement('a')
                a.href =  URL.createObjectURL(file)
                a.download = new Date().getTime();
                a.click()


        })

        
 }

 downloadBtn.addEventListener("click",()=>{
        download()
 })

 resetBtn.addEventListener("click",()=>{
        window.location.reload();
 })