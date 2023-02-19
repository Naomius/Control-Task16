(function () {
    const Answers = {
        quiz: null,
        currentQuestIndex: 1,
        questTitleElem: null,
        optionElem: null,
        rightQuizzes: [],
        quizzes: [],
        init() {
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            const stringId = url.searchParams.get('answerId').split(',', 6);
            console.log(stringId)
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

            const xhr = new XMLHttpRequest();
            const rightAnswerId = url.searchParams.get('id');
            xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.quizzes = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
            console.log(this.quizzes)

            const prevPageBtn = document.querySelector('.answerBtn');
            prevPageBtn.onclick = function () {
                location.href = 'result.html' + location.search;
            }
        },
        startQuizTest() {
            document.getElementById('answer-title').innerText = this.quiz.name;
            this.questTitleElem = document.querySelector('.answer-question-title');
            this.optionElem = document.querySelector('.answer-question-options');

            console.log(this.quiz)
            this.showQuestions();

        },
        showQuestions() {
            console.log(this.quiz.questions)
            this.quiz.questions.forEach((q, i)=> {
                const qWrapper = document.querySelector('.answer-wrapper');
                const questionAnswer = `<div class="answer-question" id="${q.id}">
                                           <div class="answer-question-title" id="title">
                                               <span>Вопрос ${i + 1}:</span> ${q.question}
                                           </div>
                                           <div class="answer-question-options" id="options2">
                                                ${renderAnswers(q.answers, i+1)}
                                           </div>
                                       </div>`
                    qWrapper.innerHTML += questionAnswer;

                let otvetNaVopros = document.querySelector('.answer-question');
                console.log(otvetNaVopros)
            });

            function renderAnswers (answers) {
              const result = answers.map(a => {
                    const answer = `<div class="answer-question-option">
                                        <input type="radio" id="${a.id}" disabled ='disabled'>
                                        <label>${a.answer}</label>
                                    </div>`;
                    return answer;
                });

              return result.join('');
            }

        },

        // checkAnswers() {
        //     this.quiz.questions.forEach((item, index)=> {
        //         console.log(item.id)
        //
        //     })
            // let count = document.querySelector('.answer-question');
            // console.log(count.id)
               // this.init()
            // for (let i = 0; i < count.id.length; i++) {
            //     if (this.quizzes[i] === this.stringId) {
            //         console.log('yes')
            //     }
            // }
            // console.log(stringId)
        // },

    }
    Answers.init();
})();

