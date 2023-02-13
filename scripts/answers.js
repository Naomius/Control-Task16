(function () {
    const Answers = {
        quiz: null,
        currentQuestIndex: 1,
        questTitleElem: null,
        optionElem: null,
        init() {
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            const stringId = url.searchParams.get('answerId');
            const answersIdMassive = stringId.split(' ');
            
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);

                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.startQuizTest();
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        startQuizTest() {
            this.questTitleElem = document.querySelector('#title');
            this.optionElem = document.querySelector('#options');

            console.log(this.quiz)
            this.showQuestions();
        },
        showQuestions() {
            const activeQuestion = this.quiz.questions[this.currentQuestIndex - 1];
            this.questTitleElem.innerHTML = '<span>Вопрос ' + this.currentQuestIndex
                + ':</span> ' + activeQuestion.question;

            activeQuestion.answers.forEach(answer => {
                const optionElement = document.createElement('div');
                optionElement.className = 'answer-question-option';

                const inputId = 'answer-' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id);

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId)
                labelElement.innerText = answer.answer;

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);

                this.optionElem.appendChild(optionElement);
            })
            // this.optionElem.innerHTML = '';
        }
    }
    Answers.init();
})();

