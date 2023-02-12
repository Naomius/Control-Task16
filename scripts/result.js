(function () {
    const Result = {
        finalPage: null,
        init() {

            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score') +
                '/' + url.searchParams.get('total');

            const nextPageBtn = document.querySelector('#answersPage');
            nextPageBtn.onclick = function () {
                location.href = 'answers.html' + location.search;
            }
        },


    }

    Result.init();
})();