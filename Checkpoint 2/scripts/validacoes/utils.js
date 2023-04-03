/// Normalização dos dados
function retiraEspacosDeUmValorInformado(valorRecebido) {
    return valorRecebido.trim();
  }
  
  function converteValorRecebidoParaMinusculo(valorRecebido) {
    return valorRecebido.toLowerCase();
  }
  
  /// BASE-URL da API onde o projeto realiza a conexão
  function apiBaseUrl() {
    return "https://todo-api.ctd.academy/v1"
  }
  
  /// Validação de email: formato válido usando RegExp (Expressões regulares)
  function validaEmailRecebido(emailRecebido) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRecebido)) {
      return true;
    } else {
      return false;
    }
  }
  
  /// Estilização customizada do elemento <small>
  function elementoSmallErro(elementoRecebido) {
    elementoRecebido.style.color = "#E42323BF";
    elementoRecebido.style.fontSize = "8";
    elementoRecebido.style.fontWeight = "bold";
  }
  
  /// Função que pega o Cookie salvo no navegador
  /// NOTA: Se for utilizado o Storage, não é necessário ter essa função.
  // Retirado de: https://www.w3schools.com/js/js_cookies.asp
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }