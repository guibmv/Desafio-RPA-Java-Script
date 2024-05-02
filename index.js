const {Builder, Browser, By} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge")
const readlineSync = require("readline-sync");

/* ---------------------------- // ----------------------------
    Função que exibe as opções para o usuário no console, 
    quando escolhido a opção 1, é executado a RPA.
   ---------------------------- // ---------------------------- */

async function Main(){
    while (true){
        console.clear();
        console.log("-----------------------------------------------------------------------------------");
        console.log("|                                                                                 |");
        console.log("|                        *** Selecione uma opção ***                              |");
        console.log("|                                                                                 |");
        console.log("| 1. Automação Web Preenchimento de formulário + Manipulação DOM (Usando Chrome)  |");
        console.log("|                                                                                 |");
        console.log("| 2. Automação Web Preenchimento de formulário + Manipulação DOM (Usando Firefox) |");
        console.log("|                                                                                 |");
        console.log("| 3. Automação Web Preenchimento de formulário + Manipulação DOM (Usando Edge)    |");
        console.log("|                                                                                 |");
        console.log("| 0. Sair                                                                         |");
        console.log("|                                                                                 |");
        console.log("-----------------------------------------------------------------------------------");
        const opcao = readlineSync.question("Digite um valor: ");
            if (opcao == 0){
                console.log("Ok, saindo...");
                break;
            }
            else if (opcao == 1){
                Tarefa1(1);
                break;
            }
            else if (opcao ==2){
                Tarefa1(2);
                break;
            }
            else if (opcao == 3){
                Tarefa1(3);
                break;
            }
            else {
                console.log("Opção inválida. Por favor, tente novamente.");
                await timer(1000);
            }
            console.clear();

            async function timer(ms){
                return new Promise(resolve => setTimeout(resolve, ms));
            }
    }
}

// Chamada para a função Main().
Main();

/* ---------------------------- // ----------------------------
    Função que executa a Tarefa 1, usando a biblioteca selenium 
    para fazer a automação, preenchendo o formulário com os dados 
    que foram gerados pelas funções e em seguida executando
    a Tarefa 2, onde manipula o DOM do site para trocar as tags <p> 
    para "Texto alterado".
   ---------------------------- // ---------------------------- */

async function Tarefa1(navegador){

    // Chamada das funções
    const enderecos = await GerarEnderecos();
    const email = await GerarEmail();
    const telefone = await GerarTelefone();
    const cartao = await GerarCartao();
    const nome = await GerarNomeCompleto();

    let driver;

    if (navegador == 1){
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--start-maximized")
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(chromeOptions).build();
    }
    else if(navegador == 2){
        let firefoxOptions = new firefox.Options();
        driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(firefoxOptions).build();
        await driver.manage().window().maximize();
    }
    else if(navegador == 3){
        let edgeOptions = new edge.Options();
        driver = await new Builder().forBrowser(Browser.EDGE).setEdgeOptions(edgeOptions).build();
        await driver.manage().window().maximize();
    }

    await driver.get("https://onfly-rpa-forms-62njbv2kbq-uc.a.run.app/");

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[1]/input")).sendKeys(nome.nome);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[2]/input")).sendKeys(telefone.telefone);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[3]/input")).sendKeys(email.email);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[4]/button[2]")).click();

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[1]/input")).sendKeys(enderecos.cep);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[2]/input")).sendKeys(enderecos.endereco + ", " + enderecos.numero);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[3]/input")).sendKeys(enderecos.cidade);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[4]/input")).sendKeys(enderecos.estado);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[4]/button[2]")).click();
   
    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[1]/input")).sendKeys(nome.nome);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[2]/input")).sendKeys(cartao.numeroCartao);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[3]/input")).sendKeys(cartao.dataValidade);
    
    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[4]/input")).sendKeys(cartao.cvv);

    await driver.sleep(2000);
    await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[4]/button[2]")).click();  

    await driver.sleep(2000);
    await Tarefa2(driver);

    await driver.sleep(8000);
    await driver.quit();

    console.log("Automação realizada com sucesso!!!");
}

/* ---------------------------- // ----------------------------
    Função que executa a Tarefa 2, pois quando chamada altera os
    elementos <p>, para "Texto alterado".
   ---------------------------- // ---------------------------- */

async function Tarefa2(driver){
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
}

/* ---------------------------- // ----------------------------
    Função que sorteia um endereço aleatório, de acordo com os
    endereços que estão contidos na listaEnderecos.
   ---------------------------- // ---------------------------- */

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

/* ---------------------------- // ----------------------------
    Função que valida o email usando regex.
   ---------------------------- // ---------------------------- */

function GerarEmail(){
    const email = "usuario@exemplo.com";

    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (regex.test(email) == true){
        return{
            "email": email
        }
    }
    else{
        console.log("Email inválido!")
    }
}

/* ---------------------------- // ----------------------------
    Função que gera números aleatórios, simulando um número de
    telefone. Os primeiros números sempre serão "319".
---------------------------- // ---------------------------- */

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

/* ---------------------------- // ----------------------------
    Função que gera números aleatórios, simulando os números de
    um cartão, também gera uma data de validade válida e um cvv
    aleatório.
   ---------------------------- // ---------------------------- */

function GerarCartao(){

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

    const ano = "20" + (Math.floor(Math.random() * 10) + 25);

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

/* ---------------------------- // ----------------------------
    Função que sorteia nomes aleatórios, de acordo com as 
    listas de nomes e sobrenomes.
   ---------------------------- // ---------------------------- */

function GerarNomeCompleto(){
    const listaNomes = ["Emílio", "Karina", "Leandro", "Hércules", "Adriana", "Arnaldo", "Guilherme", "Luisa", "Juliana",
    "João", "Felipe", "Gilmara", "David", "Helena", "Alberto", "Patrick", "Janice", "Margareth", "Gabriela", "Luiz", "Bianca",
    "Alonso", "Carla", "Josué", "Ian"]

    const listaSobreNomes = ["Ortega", "Da Silva", "Azevedo", "Batista", "Franco", "Oliveira", "Pacheco", "Ramires", "Fidalgo",
    "Almeida", "Furtado", "Galvão", "Bueno", "Vieira", "Perez", "Brito", "Mendes", "Domingues", "Delvalle", "Faria",
    "Correia", "Pena", "Bittencourt", "Chaves"]

    const quantidadeSobreNomes = Math.floor(Math.random() * 3) + 1;

    const indicePrimeiroNome = Math.floor(Math.random() * listaNomes.length);

    const primeiroNomeAleatorio = listaNomes[indicePrimeiroNome];

    const listaSobreNomesAleatorios = new Set();

    while (listaSobreNomesAleatorios.size < quantidadeSobreNomes){
        const indiceSobreNome = Math.floor(Math.random() * listaSobreNomes.length);
        listaSobreNomesAleatorios.add(listaSobreNomes[indiceSobreNome]);
    }

    const listaSobreNomesAleatoriosArray = Array.from(listaSobreNomesAleatorios);

    const nomeCompleto = primeiroNomeAleatorio + " " + listaSobreNomesAleatoriosArray.join(" ");
    
    return {
        "nome": nomeCompleto
    }
}
