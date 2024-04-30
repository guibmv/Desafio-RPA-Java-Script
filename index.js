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
    const email = "usuario@example.org";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email) == true){
        console.log("Email válido!")
    }
    else{
        console.log("Email inválido!")
    }
}

GerarEmail();

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