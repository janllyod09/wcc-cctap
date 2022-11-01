const wrapper = document.querySelector(".wrapper"),
generateBtn = document.getElementById("btnGenerate"),
qrImg = wrapper.querySelector(".qr-code img");

const fullname = document.getElementById("fname"),
address = document.getElementById("address"),
gender = document.getElementById("gender"),
age = document.getElementById("age");

generateBtn.addEventListener("click", () => {
    let fnameValue = fullname.value;
    let addressValue = address.value;
    let genderValue = gender.value;
    let ageValue = age.value;
    if (!fnameValue || !addressValue || !genderValue || !ageValue){
        alert("Please fill out empty field/s");
        return;
    } 
    else if(Number.isInteger(+ageValue)){     
        let qrData = fnameValue + 
                    "/" + addressValue + 
                    "/" + genderValue + 
                    "/" + ageValue;
        console.log(qrData);
        generateBtn.innerText = "Generating QR Code...";
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
        qrImg.addEventListener("load", () => {
            wrapper.classList.add("active");
            generateBtn.innerText = "Generate QR Code";
        });
    }
    else{
        alert("Enter age (numbers only)");
        return;
    }
});

fullname.addEventListener("keyup", () => {
    if(!fullname.value) {
        wrapper.classList.remove("active");
    }
});

let btnDownload = document.getElementById('dlQR');
btnDownload.addEventListener("click", () => {
    let imagePath = qrImg.getAttribute('src');
    btnDownload.innerText = "Downloading image..."
    fetchFile(imagePath);
});

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = "my_wcc_cctapp_qrcode";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
        btnDownload.innerText = "Download QRcode"
        alert("Download successful")
    }).catch(() => {
        alert("Failed to download QR code image!")
    });
}