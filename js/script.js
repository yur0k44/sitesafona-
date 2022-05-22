"use strict"

document.addEventListener('DOMContentLoaded',function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);// получаем событие submit которое активирует функцию formSend
// функция отправки формы
    async function formSend(e){
        e.preventDefault();// запрещаем отправку формы
        let error = formValidate(form);// создаём переменную error и присваиваем ей результат функции formValidate
        
        
        let formData = new FormData(form);// создаём переменную и перетягиваем в неё все данные полей
        formData.append('image',formImage.files[0]);// добавляем в переменную изображение полученной картинки


        if (error === 0){// всё норм

           form.classList.add('_sending');// добавляем класс в сss отправка пошла ! 


        // отправка плагином phpmailer по технологии аякс с помощью  fetch
        let response = await fetch('sendmail.php',{// ждём отправки методом пост переменной респонд в файл sendmail.php
            method: 'POST',
            body:formData
        });
        if (response.ok) { //если норм

            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML ='';
            form.reset();
            form.classList.remove('_sending');// убираем класс в сss отправка пошла ! 
        } else { alert ("Ошибка") ;// если что то не так
        form.classList.remove('_sending');}// убираем класс в сss отправка пошла ! 




        } else {// не всё заполнено или ненорм
            alert('Заполните обязательные поля');
        }
    }
// функция проверки формы на заполнение
    function formValidate(form){
        let error = 0;// создаём переменную error
        let formReq = document.querySelectorAll('._req');//присваиваем переменной formReq все элементы с классом _req'

        for(let index = 0 ; index<formReq.length; index++){// цикл проверки константы input на
            const input = formReq[index]; //получаем обьект в константу input
            formRemoveError(input);//убираем с него класс error

            if (input.classList.contains('_email')){
                if(emailTest(input)){// если тест email непройден
                    formAddError(input);//добавляем классы ошибки к проверяемым элементам функцией addError
                    error++;//увеличить на единицу переменную
                }

            } else if(input.getAttribute("type") === "checkbox" && input.checked === false){// проверяем  есть ли чекбокс и если есть чтобы он был  не отмечен тогда
                formAddError(input);
                error++;
            }else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }


        }
        return error;//вернуть из функции формвалидэйт значение error
    }
function formAddError (input) {// функция добавления ошибки
    input.parentElement.classList.add('_error');//добавляет обьекту класс error
    input.classList.add('_error');//добавляет родительскому обьекту класс error
    }

function formRemoveError(input) {// функция снятия ошибки
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}
function emailTest(input) {// функция проверки правильности введения email
    return !/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/.test(input.value);
}
//получаем инпут file с изображением в переменную
const formImage = document. getElementById('formImage');
//получаем айди для превью в переменную
const formPreview = document. getElementById('formPreview');

formImage.addEventListener('change', ()=>{// добавляем событие чендж если выбран файл
    uploadFile(formImage.files[0]);// вызываем функцию выгрузки файла
});
function uploadFile(file) {
    //проверяем тип файла
    if(!['image/jpeg','image/png','image/gif'].includes(file.type)) {
        alert('только изображения');
        formImage.value = '';
        return;
    }
//проверяем размер
    if(file.size>2*1024*1024) {
        alert('файл больше 2 мб');
        return;
    }

var reader = new FileReader();
reader.onload = function(e){
    formPreview.innerHTML = `<img src="${e.target.result}" alt="фото">`;//сдесь пиздыска или сопля !!! `
    
};
reader.onerror = function(e){
    alert('Oшибка');               
};
reader.readAsDataURL(file);

}
});