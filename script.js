document.addEventListener('DOMContentLoaded',()=>{
    const startButton=document.getElementById('start-btn');
    const nextButton=document.getElementById('next-btn');
    const restartButton=document.getElementById('restart-btn');
    const questionContainer=document.getElementById("question-container");
    const questionText=document.getElementById("question-text");
    const questionChoices=document.getElementById('choices-list');
    const resultContainer=document.getElementById('result-container');
    const totalScore=document.getElementById('score');

    const questions=[
            {
                question: "What is the capital of France?",
                choices: ["Paris", "London", "Berlin", "Madrid"],
                answer: "Paris"
            },
            {
                question: "Which planet is known as the Red Planet?",
                choices: ["Mars", "Venus", "Jupiter", "Saturn"],
                answer: "Mars"
            },
            {
                question: "Who wrote 'Hamlet'?",
                choices: ["Charles Dickens", "Jane Austen", "William Shakespeare","George Orwell"],
                answer: "William Shakespeare"
            },
            {
                question: "What is the largest ocean on Earth?",
                choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: "Pacific Ocean"
            },
            {
                question: "Who painted the Mona Lisa?",
                choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
                answer: "Leonardo da Vinci"
            }
        ];

        let currQuestionIdx=0;
        let score=0;

        startButton.addEventListener('click',startQuiz);
           

        nextButton.addEventListener('click',()=>{
            currQuestionIdx++;
            if(currQuestionIdx<questions.length){
                 showQuestion();
            }
            else{
                showResult();
            } 
        })

          restartButton.addEventListener('click',()=>{
            currQuestionIdx=0;
            score=0;
            startQuiz();
          })

        function startQuiz(){
            shuffleArray(questions);
            startButton.classList.add('hidden');
            resultContainer.classList.add('hidden');
            questionContainer.classList.remove('hidden');
            showQuestion();
        }
    
         function shuffleArray(arr){
            for(let i=arr.length-1;i>=0;i--){
                const j=Math.floor(Math.random()*(i+1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
         }


        function showQuestion(){
           nextButton.classList.add('hidden');
           questionText.textContent=questions[currQuestionIdx].question;
           questionChoices.innerHTML=''; 
           const shuffledChoices = questions[currQuestionIdx].choices;
           shuffleArray(shuffledChoices);
           shuffledChoices.forEach(choice=>{
               const li=document.createElement('li');
               li.textContent=choice;
               li.addEventListener('click',()=>{
                disableChoices();
                li.classList.add('clicked');
                selectAnswer(choice);
                
            });
               questionChoices.appendChild(li);
           })
        }
        
        function disableChoices(){
            const allChoices = questionChoices.querySelectorAll('li');
            allChoices.forEach((choice)=>{
                choice.classList.add('disabled');
               choice.removeEventListener('click', () => {});
            })
        }

        function selectAnswer(choice){
            
            const correctAnswer=questions[currQuestionIdx].answer;
             if(choice==correctAnswer){
                score++;
             }
             nextButton.classList.remove('hidden');
        }

        function showResult(){
            questionContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            totalScore.textContent=`${score} out of ${questions.length}`;
        }
})