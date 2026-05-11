document.addEventListener('DOMContentLoaded', () => {
    const keyInput = document.getElementById('key');
    const messageInput = document.getElementById('inputData');
    const resultArea = document.getElementById('outputData');
    const btnEncrypt = document.getElementById('btnEncrypt');
    const btnDecrypt = document.getElementById('btnDecrypt');

    // Função interna de cifra XOR
    function xorCipher(text, key) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    // Ação de Criptografar
    btnEncrypt.addEventListener('click', () => {
        const key = keyInput.value;
        const text = messageInput.value;

        if (!key || !text) return alert("Preencha todos os campos!");

        const encrypted = xorCipher(text, key);
        // Transforma em Base64 para exibir com segurança
        resultArea.value = btoa(unescape(encodeURIComponent(encrypted)));
    });

    // Ação de Descriptografar
    btnDecrypt.addEventListener('click', () => {
        const key = keyInput.value;
        const text = messageInput.value;

        if (!key || !text) return alert("Preencha todos os campos.");

        try {
            // Decodifica de Base64 e reverte o XOR
            const decodedBase64 = decodeURIComponent(escape(atob(text)));
            const decrypted = xorCipher(decodedBase64, key);
            resultArea.value = decrypted;
        } catch (e) {
            resultArea.value = "ERRO: Chave incorreta ou código inválido.";
        }
    });
});