const {Builder, Browser, By} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const readlineSync = require("readline-sync");

async function Main(){
    while (true){
        console.log("---------------------------------------------------------------------");
        console.log("|                                                                   |");
        console.log("|                   *** Selecione uma opção ***                     |");
        console.log("|                                                                   |");
        console.log("| 1. Automação Web (Preenchimento de formulário) + Manipulação DOM  |");
        console.log("|                                                                   |");
        console.log("| 0. Sair                                                           |");
        console.log("|                                                                   |");
        console.log("---------------------------------------------------------------------");
        const opcao = readlineSync.question("Digite um valor: ");
            if (opcao == 0){
                console.log("Ok, saindo...");
                break;
            }
            else if (opcao == 1){
                AutomacaoWeb();
                break;
            }
            else {
                console.log("Opção inválida. Por favor, tente novamente.")
                Main();
            }
            console.clear();
    }
}

Main();

async function AutomacaoWeb(){
    const enderecos = await GerarEnderecos();
    const email = await GerarEmail();
    const telefone = await GerarTelefone();
    const cartao = await GerarCartao();
    const nome = await GerarNomeCompleto();

    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--start-maximized")
    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(chromeOptions).build();

    await driver.get("https://onfly-rpa-forms-62njbv2kbq-uc.a.run.app/");

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[1]/input")).sendKeys(nome.nome);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[2]/input")).sendKeys(telefone.telefone);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[3]/input")).sendKeys(email.email);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[4]/button[2]")).click();

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[1]/input")).sendKeys(enderecos.cep);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[2]/input")).sendKeys(enderecos.endereco + ", " + enderecos.numero);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[3]/input")).sendKeys(enderecos.cidade);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[4]/input")).sendKeys(enderecos.estado);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[4]/button[2]")).click();
   
    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[1]/input")).sendKeys(nome.nome);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[2]/input")).sendKeys(cartao.numeroCartao);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[3]/input")).sendKeys(cartao.dataValidade);
    
    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[4]/input")).sendKeys(cartao.cvv);

    await timer(3000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[4]/button[2]")).click();

    await timer(1000);
    const elementos = await driver.findElements(By.tagName("p"));
    try{
        for (const elemento of elementos){
            const texto = await elemento.getText();
    
            const novoTexto = "Texto alterado";
    
            await driver.executeScript(`arguments[0].innerText = "${novoTexto}"`, elemento);
        }
    }
    catch{
        console.log("Erro inesperado.")
    }

    await timer(10000);
    await driver.quit();

    async function timer(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    console.log("Automação realizada com sucesso!!!");
}

function GerarEnderecos(){

    const listaEnderecos = [{
            "cep": "13216000",
            "endereco": "Avenida São João",
            "cidade": "Jundiaí",
            "estado": "SP"
        },
        {
            "cep": "30120060",
            "endereco": "Rua dos Carijós",
            "cidade": "Belo Horizonte",
            "estado": "MG"
        },
        {
            "cep": "75802095",
            "endereco": "Avenida Tocantins",
            "cidade": "Jataí",
            "estado": "GO"
        }
    ]

    const pegarIndiceAleatorio = Math.floor(Math.random() * listaEnderecos.length);

    const EnderecoAleatorio = listaEnderecos[pegarIndiceAleatorio];

    const numeroEndereco = [];

    for (var i = 0; i < 3; i++){
        const gerarNumero = Math.floor(Math.random() * 9) + 1;
        numeroEndereco.push(gerarNumero);
    }

    const numeroCasa = numeroEndereco.join("");

    return{
        cep: EnderecoAleatorio.cep,
        cidade: EnderecoAleatorio.cidade,
        endereco: EnderecoAleatorio.endereco,
        numero: numeroCasa,
        estado: EnderecoAleatorio.estado
    }
}

function GerarEmail(){
    const email = "usuario@example.com";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) == true){
        return {
            "email": email
        }
    }
    else{
        console.log("Email inválido!")
    }
}

function GerarTelefone(){

    numero = [];
    n = 0

    for (var i = 0; i < 7; i++){
        if (n == 0){
            const gerarPrimeiroNumero = Math.floor(Math.random() * 9) + 1;
            numero.push(gerarPrimeiroNumero);
            n++;
        }
        const gerarTel = Math.floor(Math.random() * 9);
        numero.push(gerarTel);
    }

    telefone = "319"+numero.join("");

    return{
        telefone: telefone
    }
}

function GerarCartao(){
    //nomeTitular = GerarNome()

    const gerarNumeroCartao = [];

    while (gerarNumeroCartao.length < 16){
        if (gerarNumeroCartao.length == 0){
            const n = Math.floor(Math.random() * 9) + 1;
            gerarNumeroCartao.push(n);
        }
        else{
            const n1 = Math.floor(Math.random() * 10);
            gerarNumeroCartao.push(n1);
        }
    }

    const numeroCartao = gerarNumeroCartao.join("").match(/.{1,4}/g).join(" ");
    
    const mes = "0" + (Math.floor(Math.random() * 9) + 1);

    const ano = "20" + (Math.floor(Math.random() * 10) + 24);

    const dataValidade = mes + "/" + ano;

    const codigoCartao = [];

    while(codigoCartao.length < 3){
        const n2 = Math.floor(Math.random() * 9) + 1;
        codigoCartao.push(n2);
    }

    const cvv = codigoCartao.join("");

    return{
        numeroCartao: numeroCartao,
        dataValidade: dataValidade,
        cvv: cvv
    }
}
                      
function GerarNomeCompleto(){
    const listaNomes = ["Emílio", "Karina", "Leandro", "Hércules", "Adriana", "Arnaldo", "Guilherme", "Luisa", "Juliana",
    "João", "Felipe", "Gilmara", "David", "Helena", "Alberto", "Patrick", "Janice", "Margareth", "Gabriela", "Luiz", "Bianca",
    "Alonso", "Carla", "Josué", "Ian"]

    const listaSobreNomes = ["Ortega", "Da Silva", "Azevedo", "Batista", "Franco", "Oliveira", "Pacheco", "Ramires", "Fidalgo",
    "Almeida", "França", "Furtado", "Galvão", "Bueno", "Vieira", "Perez", "Brito", "Mendes", "Domingues", "Delvalle", "Faria",
    "Correia", "Pena", "Bittencourt", "Chaves"]

    const quantidadeSobreNomes = Math.floor(Math.random() * 3) + 1; /* Código que gera um número aleatório de 1 a 3, onde vai ser definido quantos sobrenomes o nome completo vai ter */

    const indicePrimeiroNome = Math.floor(Math.random() * listaNomes.length); /* Código que gera um índice aleatório para a lista "listaNomes"*/

    const primeiroNomeAleatorio = listaNomes[indicePrimeiroNome]; /* Código que exibe o nome escolhido através do índice gerado aleatoriamente na variável "indicePrimeiroNome" */

    const listaSobreNomesAleatorios = new Set(); /* Declara um Set vazio para armazenar os sobrenomes que será utilizado no nome completo */

    /* Aqui abri uma condição while, que será executada até a quantidade de sobrenomes no meu set ser igual
    a quantidade que foi gerada aleatoriamente na variável "quantidadeSobreNomes" */

    while (listaSobreNomesAleatorios.size < quantidadeSobreNomes){
        const indiceSobreNome = Math.floor(Math.random() * listaSobreNomes.length);
        listaSobreNomesAleatorios.add(listaSobreNomes[indiceSobreNome]);
    }

    const listaSobreNomesAleatoriosArray = Array.from(listaSobreNomesAleatorios); /* Transformando o set em um array, lembrando que foi usado set anteriormente e não um array apenas para validar se um sobrenome já havia sido alocado ou não */

    const nomeCompleto = primeiroNomeAleatorio + " " + listaSobreNomesAleatoriosArray.join(" ");
    
    return {
        "nome": nomeCompleto
    }
}
