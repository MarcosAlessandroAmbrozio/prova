function validar() {
  var codigo = document.getElementById("codigo").value;
  var desc = document.getElementById("desc").value;
  var quant = document.getElementById("quant").value;

  if (!codigo) {
    document.getElementById("erro").style.display = "block";
    alert("Informe o código")
    document.getElementById("codigo").focus;
    return false;
  }
  if (!desc) {
    document.getElementById("erro").style.display = "block";
    alert("Informe a descrição")
    return false;
  }

  if (!quant) {
    document.getElementById("erro").style.display = "block";
    alert("Informe a Quantidade")
    return false;
  }
}




$(function () {
  var operacao = "A"; //"A" = Adição;
  var indice_selecionado = -1;
  var tbClientes = JSON.parse(localStorage.getItem("tbClientes")) ?? []; //Converte a String para objeto;

  if (tbClientes == null)
    //caso não exista conteúdo, iniciamos um vetor vazio;
    tbClientes == [];

  function adicionar() {
    var cli = GetClitente("codigo", document.getElementById("codigo").value);
    if (cli != null) {
      //Verifica se o código já está cadastrado;
      return;
    }
    var cliente = JSON.stringify({
      codigo: $("#codigo").val(),
      desc: $("#desc").val(),
      quant: $("#quant").val(),
    });

    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

    alert("Item cadastrado com sucesso!");
    return true;
  }

  //Edita registro cadastro;
  function Editar() {
    tbClientes[indice_selecionado] = JSON.stringify({
      codigo: $("#codigo").val(),
      desc: $("#desc").val(),
      quant: $("#quant").val(),
    });
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Item editado com sucesso!");
    operacao = "A";
    return true;
  }

  //Listar conteudo;
  function Listar() {
    $("#tblListar").html("");
    $("#tblListar").html(
      "<thead>" +
        "<tr>" +
        "<th></th>" +
        "<th>Código:</th>" +
        "<th>Descrição:</th>" +
        "<th>Quantidade:</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
    );

    //Percorre a tabela adicionando um a um
    for (var i in tbClientes) {
      var cli = JSON.parse(tbClientes[i]);
      $("#tblListar tbody").append(
        "<tr>" + //The Element.append() method inserts a set of Node objects or string
          "<td><img src='img/comprado.png' alt='" +
          i +
          "' class='btnVerde'/><img src='img/sem_estoque.png' alt='" +
          i +
          "' class='btnAmarelo'/><img src='img/editar.png' alt='" +
          i +
          "' class='btnVermelho'/></td>" +
          "   <td>" +
          cli.codigo +
          "</td>" +
          "   <td>" +
          cli.desc +
          "</td>" +
          "   <td>" +
          cli.quant +
          "</td>" +
          "</tr>"
      );
    }
  }

  //Função que exclui o registro;
  function Excluir(){
    indice_selecionado = parseInt($(this).attr("alt"));
    tbClientes.splice(indice_selecionado, 1); 
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Item excluido com sucesso!");
}

function GetClitente(propriedade, valor){
    var cli = null;
    for(var item in tbClientes){
        var i = JSON.parse(tbClientes[item]);
        if(i[propriedade] == valor)
        cli = i;
    }
    return cli;
}
Listar();


$("#frmCadastro").bind("submit", function(){
    if(operacao == "A")
    return adicionar();
    else
        return Editar();
});

$(".btnVermelho").bind("click", function(){
    operacao = "E";
    indice_selecionado = parseInt($(this).attr("alt"));
    var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#codigo").val(cli.Codigo);
        $("#desc").val(cli.Descricao);
        $("#quant").val(cli.Quantidade);
        $("#codigo").attr("readonly", "readonly");
        $("#codigo").focus(); 
    
    edt.play();
   style ="backgroud: red";
   
});

$(".btnAmarelo").bind("click", function(){
    /*var element = document.getElementById("#tblListar");
    element.style.background='#900';*/
    estoque.play();
   
});

$(".btnVerde").bind("click", function(){
    
    comprado.play();
   
});


$("#btnExcuir").bind("click", function(){
    indice_selecionado = parseInt($(this).attr("alt"));
    Excluir();
    Listar();
});
});

var add     = new Audio();
var comprado    = new Audio();
var edt     = new Audio();
var estoque = new Audio();


add.src      = "som/Adicionar.mp3";
comprado.src = "som/comprado.mp3";
edt.src      = "som/editar.mp3";
estoque.src  = "som/sem_estoque.mp3"; 