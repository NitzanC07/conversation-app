/** בחירת של רכיבים שמופיעים בדף אינטרנט ושמירה  במשתנה */
const message = document.querySelector('.speaker__message');
const SendMessageButton = document.querySelector('.speaker__send');
const chatContainer = document.querySelector('.chat-container__conversation-field');
const author = document.querySelector('.speaker__name');
const conversationData = [];

/** יצירת פונקציה שמחזירה את התאריך והשעה של עכשיו */
function timeNow() {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const day = time.getDate();
    const month = time.getMonth() +1
    const year = time.getFullYear();
    const currentTime = `${day}/${month}/${year}, ${hour}:${minutes}:${seconds}`
    return currentTime;
};

const clock = document.querySelector('.header__time');
const whatTime = new Date();
clock.textContent = whatTime.toLocaleDateString();

/** יצירת פונקציית הקשבה של הכפתור ללחיצה של המשתמש */
SendMessageButton.addEventListener('click', () => {
    const messageData = {
        message: message.value, 
        author: author.textContent.slice(0, -1),
        time: timeNow()
    }
    const messageTemplate = `<p>${messageData.author}: ${messageData.message}</p>`;
    chatContainer.innerHTML += messageTemplate;
    message.value = '';
    author.textContent = 'דובר:'
    conversationData.push(messageData);
    console.log(conversationData);
})

/** בחירה מרובה של פריטים ששייכים לאותה מחלקה במסמך
 * querySelectorAll
 */

function allSpeakers() {
    const speakers = document.querySelectorAll('.participents__name')
    speakers.forEach(speaker => {
        speaker.addEventListener('click', () => {
            author.textContent = speaker.textContent + ':';
            message.focus();
        });
    });       
}
allSpeakers();

/** להוסיף את השם שלי כמשתתף בשיחה
 * שלב 1 - הפעלת הכפתור ופתיחת חלון קופץ להוספת משתמש חדש
 * popup-container
 * popup-container_active
 * participents__names
 * participents__add-one
 * popup__close
 * שלב 2 - הוספת המשתמש החדש לרשימת המשתתפים
 */
const popup = document.querySelector('.popup-container');
const participents = document.querySelector('.participents__names');
const buttonAddOne = document.querySelector('.participents__add-one');
const closeButton = document.querySelector('.popup__close');

const addParticipentForm = document.querySelector('.popup__form');
const participentInput = document.querySelector('.popup__input_type_participent');
const participentList = document.querySelector('.participents__names');

buttonAddOne.addEventListener('click', () => {
    popup.classList.add('popup-container_active');
    participentInput.focus()
    closeButton.addEventListener('click', () => {
        popup.classList.remove('popup-container_active');
    })
})

addParticipentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = participentInput.value;
    const participentTemplate = `<p class="participents__name">${name}</p>` 
    participentList.innerHTML += participentTemplate;
    allSpeakers();
    popup.classList.remove('popup-container_active')
});



/** להפעיל מקש אנטר */

