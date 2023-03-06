/* Var init */questionscreen
let user = ""
let registers = []
let elWelcomeScr = document.getElementById("welcomescreen")
let elQuestionScreen = document.getElementById("questionscreen")
let elScreenResult = document.getElementById("resultscreen")
let elOptionScreen = document.getElementById("optionscreen")
let elRestartScreen = document.getElementById("restartscreen")
let elTableScreen = document.getElementById("tablescreen")

function hiddenAllScreens(){
    elWelcomeScr.classList.add('hidden')
    elQuestionScreen.classList.add('hidden')
    elScreenResult.classList.add('hidden')
    elOptionScreen.classList.add('hidden')
    elRestartScreen.classList.add('hidden')
    elTableScreen.classList.add('hidden')
}

function User(name){
    this.name = name
    this.answers = {
        "1": -1,
        "2": -1,
        "3": -1,
        "4": -1,
        "5": -1,
        "6": -1,
        "7": -1,
        "8": -1,
        "9": -1,
        "10": -1,
        "11": -1,
        "12": -1,
        "13": -1,
        "14": -1,
        "15": -1,
        "16": -1,
        "17": -1,
        "18": -1,
        "19": -1,
        "20": -1,
    }
    this.init = 0
    this.finish = false
}

function Quiz() {
    this.questions = []
    this.counter = 0
    this.indexCurrentQuestion = 0
    this.addQuestion = function(question) {
        this.questions.push(question)
    }
    this.showCurrentQuestion = function(currentQuestion) {
        this.counter = currentQuestion
        this.indexCurrentQuestion = currentQuestion
        if( this.indexCurrentQuestion < this.questions.length && currentQuestion >= 0){
            this.questions[currentQuestion].getElement(this.counter)
        } else {
            let elCorrectAnswers = document.querySelector("#correctAnswers")
            elCorrectAnswers.innerHTML = "Gracias por sus respuestas"
            
            hiddenAllScreens()
            elScreenResult.classList.remove("hidden")
            elOptionScreen.classList.remove("hidden")
            elRestartScreen.classList.remove("hidden")
    
            registers.push(user)
            console.log("Registers: "+JSON.stringify(registers))
        }
    }
}

function Question(id,title, answers, type, nextQuestions) {
    this.id = id
    this.title = title
    this.answers = answers
    this.type = type
    this.nextQuestions = nextQuestions
    this.getBody = function() {
        let body = this.title.toUpperCase() + '\n'
        for (let i=0; i<this.answers.length; i++) {
            body += (i+1) + '. ' + this.answers[i] + '\n'
        }
        return body
    }
    this.addAnswer = function(answer) {
        // this.answers[this.answers.length] = answer
        this.answers.push(answer)
    }
    this.isCorrectAnswer = function(userAnswer) {
        if (this.correctAnswer == userAnswer) return true
        else return false
    }
    this.getElement = function(counter) {
        let questionNumber = document.createElement("h2")
        questionNumber.textContent = "Pregunta "+counter
        elQuestionScreen.append(questionNumber)
        let questionTitle = document.createElement("h3")
        questionTitle.textContent = this.title
        elQuestionScreen.append(questionTitle)
        
        let questionAnswers = document.createElement("ul")
        questionAnswers.classList.add("question__awswers")

        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement("li")
            elAnswer.classList.add("awswer")
            elAnswer.textContent = answer
            elAnswer.id = index
            elAnswer.addEventListener("click", this.checkAnswer)
            questionAnswers.append(elAnswer)
        })
        
        elQuestionScreen.append(questionAnswers)
    }
    
    this.checkAnswer = (event) => {
        let anwserSelected = event.target
        let indexAnswer = anwserSelected.id
        let idQuestion = this.id
        user.answers[idQuestion] = parseInt(indexAnswer, 10)
        this.saveAnswerData(idQuestion, parseInt(indexAnswer, 10))
        
        let nextQuestion = this.nextQuestions[indexAnswer]
        quiz.indexCurrentQuestion = this.id
        
        setTimeout(function() {
            elQuestionScreen.textContent = ''
            quiz.showCurrentQuestion(nextQuestion)
        }, 1000)
    }

    this.saveAnswerData = (idQ, q) => {
        let users = []
        let indexUpdate = 0
        let localStorageData = localStorage.getItem('data')
        let dataStorage = ""
        if (localStorageData.substring(0,1) == '[') {
            dataStorage = JSON.parse(localStorageData);
        } else {
            dataStorage = JSON.parse("[" + localStorageData + "]");
        }
        dataStorage.forEach( (elem, index) => {
            if (elem.name == user.name) {
                indexUpdate = index
                user.init = idQ
                if (idQ > 17) {
                    user.finish = true
                }
                elem.answers[idQ] = q
                ifExist = true
            }
        })

        dataStorage.forEach( (elem, index) => {
            if (index == indexUpdate) {
                users.push(user)
            } else {
                users.push(elem)
            }
        })
        localStorage.setItem('data',JSON.stringify(users))
    }
}

function addQuestions(q){
    let question0 = new Question(0,'¿Realizaste una compra?', ["Si", "No"],'Inicio',[1,10])
    let question1 = new Question(1,'¿En qué departamento realizaste tu compra?', ["Electrónica","Blancos","Muebles"], 'Compra',[2,2,2])
    let question2 = new Question(2,'¿Recibiste atención personalizada de alguno de nuestros colaboradores?', ["Si","No"], 'Compra', [3,3])
    let question3 = new Question(3,'¿El producto que adquiriste ha cumplido tus espectativas?', ['Sí', 'No'], "Compra",[4,4])
    let question4 = new Question(4,'¿Hay otro producto que sea de tu interés?',['Si','No'],"Compra",[5,6])
    let question5 = new Question(5,'¿De qué departamento es el producto de tu interés?', ["Electrónica","Blancos","Muebles"], 'Compra',[6,6,6])
    let question6 = new Question(6,'¿Cuándo planeas visitarnos nuevamente?', ['No lo he considerado','La próxima semana o antes','En 2 o 3 semanas','El siguiente mes','Despúes de un mes'], 'Compra', [7,7,7,7,7])
    let question7 = new Question(7,'¿Qué fue lo que más te gusto de nuestras instalaciones?', ['Nada en particular','Los espacios son amplios','Pude encontrar fácilmente lo que buscaba','Los colores e iluminación'],"Compra", [8,8,8,8])
    let question8 = new Question(8,'¿Qué fue lo que menos te gustó de nuestras instalaciones?', ['Nada en particular','Los espacios son reducidos','Encontrar lo que buscaba','Los colores e iluminación'],"Compra", [9,9,9,9])
    let question9 = new Question(9,'¿Solicitaste atención al cliente?', ["Si", "No"],'Inicio',[10,-1])
    let question10 = new Question(10,'¿Cuál fue tu solicitud?', ["Garantía","Devolución","Promoción"],'Cliente',[11,11,11,11])
    let question11 = new Question(11,'¿A qué departamento corresponde el producto en cuestión?', ["Electrónica","Blancos","Muebles"],'Cliente',[12,12,12,12])
    let question12 = new Question(12,'¿Resolvimos satisfactoriamente tu solicitud?', ["Si","No"],'Cliente',[15,13])
    let question13 = new Question(13,'¿Te solicitaron regresar otro día?', ["Si","No"],'Cliente',[14,14])
    let question14 = new Question(14,'¿Te ofrecieron alguna compensación por la molestía?', ["Si","No"],'Cliente',[15,15])
    let question15 = new Question(15,'Considerando el tiempo de atención, te pareció...?', ["Rápido","Bueno","Tardado","Muy tardado"],'Cliente',[16,16,16,16])
    let question16 = new Question(16,'¿Cómo calificarías la atención que recibiste? 1 es muy mala y 5 es excelente', ["1","2","3","4","5"],'Cliente',[17,17,17,17,17])
    let question17 = new Question(17,'¿Te consideras fan de nuestra tienda?', ["Si","No"],'Cliente',[18,18])
    let question18 = new Question(18,'¿Qué área de oportunidad identificas en nuestro servicio?', ["Instalaciones","Tiempo de atención","Calidad en la atención", "Resolución de problemas"],'Cliente',[19,19,19,19])
    let question19 = new Question(19,'¿Regresarás próximamente?', ["Si","No","Talvez"],'Cliente',[-1,-1,-1])
    q.addQuestion(question0)
    q.addQuestion(question1)
    q.addQuestion(question2)
    q.addQuestion(question3)
    q.addQuestion(question4)
    q.addQuestion(question5)
    q.addQuestion(question6)
    q.addQuestion(question7)
    q.addQuestion(question8)
    q.addQuestion(question9)
    q.addQuestion(question10)
    q.addQuestion(question11)
    q.addQuestion(question12)
    q.addQuestion(question14)
    q.addQuestion(question15)
    q.addQuestion(question16)
    q.addQuestion(question17)
    q.addQuestion(question18)
    q.addQuestion(question19)
}

function showQuestion(index) {
    hiddenAllScreens()
    elQuestionScreen.classList.remove("hidden")
    elQuestionScreen.style.display = "block"
    quiz.showCurrentQuestion(index)
}

function saveUser(){
    user = new User(document.getElementById("userInput").value)
}

function validateUser(){
    if (document.getElementById("userInput").value == "") {
        alert("Ingresa un nombre de usuario")
        return
    }
    saveUser()
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data',JSON.stringify(user))
    }
    let questionInit = searchUser()
    showQuestion(questionInit)
}

function searchUser() {
    let userInput = document.getElementById("userInput").value
    let localStorageData = localStorage.getItem('data')
    let dataStorage = ""
    if (localStorageData.substring(0,1) == '[') {
        dataStorage = JSON.parse(localStorageData);
    } else {
        dataStorage = JSON.parse("[" + localStorageData + "]");
    }
    let ifExist = false
    let question = 0
    dataStorage.forEach( (elem, index) => {
        if (elem.name == userInput) {
            ifExist = true
            question = elem.init
            if (elem.finish) {
                alert("Ya has contestado la encuesta. No puedes responder nuevamente")
            }
        }
    })
    if (!ifExist) {
        // Guardar nuevo usuario
        let users = []
        dataStorage.forEach( (elem, index) => {
            users.push(elem)
        })
        
        users.push(user)
        localStorage.setItem('data',JSON.stringify(users))
    }
    return question
}

function restartQuiz(){
    document.getElementById("userInput").value = ""
    hiddenAllScreens()
    elWelcomeScr.classList.remove("hidden")
    elOptionScreen.classList.remove("hidden")
}

function displayTable(){
    let tbody = document.getElementById("tbody")
    tbody.textContent = ''

    let localStorageData = localStorage.getItem('data')
    let dataStorage = ""
    if (localStorageData.substring(0,1) == '[') {
        dataStorage = JSON.parse(localStorageData);
    } else {
        dataStorage = JSON.parse("[" + localStorageData + "]");
    }
    dataStorage.forEach( (elem, index) => {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let nombre = document.createTextNode(elem.name)
        let ans = ""
        let nAnswer = 0
        let answerData = ""
        td.appendChild(nombre)
        tr.appendChild(td)
        let answersDataObject = JSON.parse(JSON.stringify(elem.answers))
        for (const property in answersDataObject) {
            console.log(`${property}: ${answersDataObject[property]}`);
            td = document.createElement("td")
            answerData = `${answersDataObject[property]}`
            if (answerData == "-1"){
                ans = document.createTextNode("")
            } else {
                ans = document.createTextNode(`${answersDataObject[property]}`)
            }
            if (nAnswer < 20) {
                td.appendChild(ans)
                tr.appendChild(td)
            }
            nAnswer++
        }
        tbody.appendChild(tr)
    })
}

function viewHistorico(){
    hiddenAllScreens()
    elRestartScreen.classList.remove("hidden")
    elTableScreen.classList.remove("hidden")
    displayTable()
}

hiddenAllScreens()
elWelcomeScr.classList.remove("hidden")
elOptionScreen.classList.remove('hidden')

let quiz = new Quiz()
addQuestions(quiz)

let elWelcomeBtn = document.getElementById("welcome_btn")
elWelcomeBtn.addEventListener("click", validateUser)

let elRestartBtn = document.getElementById("restart_btn")
elRestartBtn.addEventListener("click", restartQuiz)

let elHistoricoBtn = document.getElementById("historico_btn")
elHistoricoBtn.addEventListener("click", viewHistorico)
