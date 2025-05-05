const messageArea = document.getElementById("messageArea");
const fileList = document.getElementById("fileList");
const MAX_SIZE_MB = 5;

function showMessage(msg, type = "success") {
    messageArea.textContent = msg;
    messageArea.style.color = type === "error" ? "#e63946" : "#2a9d8f";
}

function upload () {
    const input = document.getElementById("uploadInput");
    const files = [...input.files];

    if (files.length === 0) {
        showMessage("Nenhum arquivo selecionado.", "error");
        return;
    }

    const oversized = files.find(file => file.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized) {
        showMessage (`Arquivo ${oversized.name} excede 5MB.`, "error");
        return;
    }

    showMessage("Enviando...", "success")

    const su = new SmashUploader ({
        region: "SUA_REGIAO",
        token: "SUA_KEY",
    });

    su.upload({ files })
    .then(result => {
        const link = result?.transfer?.transferUrl;

        if (link) {
            showMessage("Upload concluído!", "success");
    
           files.forEach(file=> {
            const li = document.createElement("li");
            li.innerHTML = `
            ${file.name} —
            <a href= "${link}" target="_blank"; ">Baixar</a>`; 
            fileList.appendChild(li);
           });
        } else {
            showMessage("Upload concluído, mas sem link.", "error");
        }
    })

    .catch(error=> {
        console.error("Error:", error);
        showMessage("Erro ao enviar o arquivo.", "error");
    });

}
