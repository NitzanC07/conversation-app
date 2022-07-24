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
const popupAddPerson = document.querySelector('.popup_type_add-person');
const participents = document.querySelector('.participents__names');
const buttonAddOne = document.querySelector('.participents__add-one');
const closeButton = document.querySelector('.popup__close');

const addParticipentForm = document.querySelector('.popup__form_type_add-person');
const participentInput = document.querySelector('.popup__input_type_participent');
const participentList = document.querySelector('.participents__names');

buttonAddOne.addEventListener('click', () => {
    popupAddPerson.classList.add('popup-container_active');
    participentInput.focus();
    closeButton.addEventListener('click', () => {
        popupAddPerson.classList.remove('popup-container_active');
        participentInput.value = '';
    })
})

addParticipentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = participentInput.value;
    const participentTemplate = `<p class="participents__name">${name}</p>` 
    participentList.innerHTML += participentTemplate;
    allSpeakers();
    popupAddPerson.classList.remove('popup-container_active');
    participentInput.value = '';
});


/** הפעלת פופאפ לכפתור האי-מייל */
const popupEmail = document.querySelector('.popup_type_send-email');
const buttonEmail = document.querySelector('.chat-container__button__send-email');
const formSendEmail = document.querySelector('.popup__form_type_email');
const inputSendEmail = document.querySelector('.popup__input_type_email');
const inputSubjectEmail = document.querySelector('.popup__input_type_subject');
const closeButtonSendEmail = document.querySelector('.popup__close_type_send-email');

buttonEmail.addEventListener('click', () => {
    popupEmail.classList.add('popup-container_active');
    inputSendEmail.focus();
    closeButtonSendEmail.addEventListener('click', () => {
        popupEmail.classList.remove('popup-container_active');
        inputSendEmail.value = '';
        inputSubjectEmail.value = '';
    })
})

formSendEmail.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = inputSendEmail.value;
    const emailSubject = inputSubjectEmail.value;
    let lastConversation = '';
    conversationData.forEach(message => {
        lastConversation += `${message.author} (${message.time}): ${message.message}%0D%0A`
    })
    lastConversation = lastConversation.replace(/[?]/g, '');
    window.open(`mailto:${email}?subject=${emailSubject}&body=${lastConversation}`);
    popupEmail.classList.remove('popup-container_active')
    inputSendEmail.value = '';
    inputSubjectEmail.value = '';
});


/** הפעלת פופאפ לכפתור האי-מייל */
const popupInfo = document.querySelector('.popup_type_information');
const closeButtonInfo = document.querySelector('.popup__close_type_info');
const buttonInformation = document.querySelector('.chat-container__button__information');

buttonInformation.addEventListener('click', () => {
    popupInfo.classList.add('popup-container_active');
    closeButtonInfo.addEventListener('click', () => {
        popupInfo.classList.remove('popup-container_active');
    })
})

/** להפעיל מקש אנטר */

/** עבודה עם תבנית
 * Template
 * מושגים חדשים
 * Tamplate, DOM tree (Document Object Model), id, 
 * בוחרים את התבנית המתאימה
 * const userTemplate = document.querySelector('#template-is').content;
 * ואז הופכים את תוכן התבנית לרכיב בעמוד 
 * const userElement = userTemplate.querySelector('.user').cloneNode(true);
 * ואז מוסיפים תוכן שרוצים לתוך התבנית
 * userElement.querySelector(".chat-container__message").textContent = "שלום";
 * ומוסיפים את הרכיב להשתלשלות המסמך
 * chatContainer.append(userElement); 
 */