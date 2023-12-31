import { format, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';

let currentId;
let allTours;

async function getData() {
    const response = await fetch(
        'https://www.bit-by-bit.ru/api/student-projects/tours'
    );
    const data = await response.json();

    allTours = data;
    return data;
}

function renderTours(tours) {
    const container = document.getElementById('container-tours');
    container.innerHTML = '';

    tours.forEach((tour) => {
        const duration = differenceInDays(
            new Date(tour.endTime),
            new Date(tour.startTime)
        );

        container.innerHTML += `
        <div class="overflow-hidden flex flex-col justify-between">
            <div class="p-8 relative bg-white rounded-40 h-full">
                    <img
                        class="rounded-40 object-cover h-52 w-full"
                        src="${tour.image}"
                        alt="Отдых. ${tour.country}"
                    />
                <div class="pt-4 relative">
                    <span
                        class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-400"
                    >
                        ${tour.country}
                    </span>
                    ${
                        tour.city !== null
                            ? `
                        <span
                        class="text-gray-400 pt-6 px-1"
                        aria-hidden="true"
                        >&middot;</span
                        >
                        <span id="cityExclusion"
                            class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-400 inline-block"
                        >
                            ${tour.city}
                        </span>
                        `
                            : ''
                    }
                </div>
                <p
                    class="montserrat text-xl lg:text-2xl xl:text-3xl font-medium text-indigo-900 pt-3"
                >
                    ${tour.hotelName}
                </p>
                <p
                    class="text-sm md:text-base font-extrabold p-2.5 rounded-full bg-slate-50 absolute top-12 left-12 text-orange-300"
                >
                    ${tour.rating}
                </p>
            </div>
            <div class="p-8 bg-white rounded-40">
                <div class="flex flex-col gap-1 pb-3">
                    <div class="flex gap-2">
                        <p
                            class="font-medium text-sm md:text-base lg:text-lg text-gray-400"
                        >
                            ${format(new Date(tour.startTime), 'dd.MM.yyyy', {
                                locale: ru
                            })}
                        </p>
                        <p
                            class="font-medium text-sm md:text-base lg:text-lg text-gray-400"
                        >
                            -
                        </p>
                        <p
                            class="font-medium text-sm md:text-base lg:text-lg text-gray-400"
                        >
                            ${format(new Date(tour.endTime), 'dd.MM.yyyy', {
                                locale: ru
                            })}
                        </p>
                    </div>
                    <p class="font-normal text-xs md:text-sm lg:text-base text-gray-400"> 
                            Кол-во дней: ${duration}
                    </p>
                </div>
                <p
                    class="montserrat text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 pb-4"
                >
                    ${tour.price} руб.
                </p>
                <div class="flex gap-3 flex-wrap">
                    <button id="btn-booking-${
                        tour.id
                    }" class="btn-primary">Забронировать</button>
                    <button id="btn-favorites" class="btn-secondary">В избранное</button>
                </div>
            </div>
        </div>
        `;
    });

    tours.forEach((tour) => {
        const btnBooking = document.getElementById(`btn-booking-${tour.id}`);
        btnBooking.addEventListener('click', () => {
            openModalWindowBooking(tour.id);
        });
    });
}

async function init() {
    let tours = await getData();
    renderTours(tours);
    loader();

    document.getElementById('thailand').addEventListener('click', () => filterCountry(tours, 'Тайланд'))
    document.getElementById('egypt').addEventListener('click', () => filterCountry(tours, 'Египет'))
    document.getElementById('cyprus').addEventListener('click', () => filterCountry(tours, 'Кипр'))
    document.getElementById('maldives').addEventListener('click', () => filterCountry(tours, 'Мальдивы'))
    document.getElementById('indonesia').addEventListener('click', () => filterCountry(tours, 'Индонезия'))
    document.getElementById('mexico').addEventListener('click', () => filterCountry(tours, 'Мексика'))
    document.getElementById('tanzania').addEventListener('click', () => filterCountry(tours, 'Танзания'))
    document.getElementById('all').addEventListener('click', () => filterCountry(tours))
}

function loader() {
    const loader = document.getElementById('loader');

    loader.classList.add('hidden');
    setTimeout(() => {
        loader.remove();
    }, 1000);
}

// открыть мод.окно
function openModalWindowBooking(id) {
    currentId = id;
    document.getElementById('modal-window-booking').style.display = 'flex';

    const tour = allTours.find((n) => {
        return n.id === id;
    });

    // Отрисовать тур
    renderModalTours(tour);
}

// Открыть мод. окно успешного бронирования
function modalWindowBookingSuccessful() {
    document.getElementById('modal-window-booking-successful').style.display =
        'flex';
}

// Отрисовать туры 
function renderModalTours(tour) {
    const containerModal = document.getElementById('tour-details');
    containerModal.innerHTML = '';

    containerModal.innerHTML += `
        <div>
            <img id="tourImage"
                class="rounded-40 object-cover h-48 w-48"
                src="${tour.image}"
                alt="Отдых. ${tour.country}"
            />
        </div>  
        <div class="flex flex-col justify-center gap-4">
            <div>
                <span id="tourCountry" class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-900" >
                    ${tour.country}
                </span>
                ${
                    tour.city !== null
                        ? `
                    <span class="text-gray-900 pt-6 px-1" aria-hidden="true" >
                    &middot;
                    </span >
                    <span id="tourCity" class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-900 inline-block">
                        ${tour.city}
                    </span>
                    `
                        : ''
                }
            </div>
            <p id="tourHotelName" class="montserrat text-lg lg:text-xl font-semibold text-indigo-900">
                ${tour.hotelName}
            </p>
            <div class="flex flex-row gap-6 pt-2">
                <div class="flex flex-col gap-1">
                    <p class="montserrat text-xs font-medium text-gray-400">
                        Дата начала поездки
                    </p>
                    <p id="tourStartTime" class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-900">
                        ${format(new Date(tour.startTime), 'dd.MM.yyyy', {
                            locale: ru
                        })}
                    </p>
                </div>
                <div class="flex flex-col gap-1">
                    <p class="montserrat text-xs font-medium text-gray-400">
                        Дата окончания поездки
                    </p>
                    <p id="tourEndTime" class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-900">
                        ${format(new Date(tour.endTime), 'dd.MM.yyyy', {
                            locale: ru
                        })}
                    </p>
                </div>
            </div>
        </div>
        `;
}

// Очистить форму
function clearForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('description').value = '';
}

// Закрыть форму
const iconCloseModalWindow = document.getElementById('close-window-booking'); //только иконка "Закрыть"
iconCloseModalWindow.addEventListener('click', closeModalWindow);

const btnCloseModalWindow = document.getElementById('btn-close-window'); //кнопка "Закрыть"
btnCloseModalWindow.addEventListener('click', closeModalWindow);

function closeModalWindow() {
    document.getElementById('modal-window-booking').style.display = 'none';
    clearForm();
}

// Закрыть окно об успешн. брони
const iconCloseModalWindowSuccessful = document.getElementById('close-window-booking-successful'); //только иконка "Закрыть"
iconCloseModalWindowSuccessful.addEventListener('click', closeModalWindowSuccessful);

const btnCloseModalWindowSuccessful = document.getElementById('btn-close-window-successful'); //кнопка "Закрыть"
btnCloseModalWindowSuccessful.addEventListener('click', closeModalWindowSuccessful);

function closeModalWindowSuccessful() {
    document.getElementById('modal-window-booking-successful').style.display = 'none';
}

const btnSendData = document.getElementById('btn-send-data'); // Кнопка "Отправить"
btnSendData.addEventListener('click', requestBooking);

// Тело запроса
async function requestBooking() {
    const params = {
        customerName: document.getElementById('customerName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        description: document.getElementById('description').value
    };

    if (params.customerName && params.phone && params.email) {
        const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${currentId}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(params)
            });
            const jsonData = await response.json();

            closeModalWindow();
            modalWindowBookingSuccessful();
        } catch {
            console.log('Ошибка!');
        }
    } else {
        document.getElementById('error-message').style.display = 'flex';
    }
}

// Для фильтров
function filterCountry(tours, country) {
    if (country) {
        const filtredTours = tours.filter((tour) => {
            return tour.country === country
        })
        renderTours(filtredTours)
        console.log(filtredTours)
    } else {
        renderTours(tours)
    }     
}

// function filtredToursCity(tours, city) {
//     const filtredTours = tours.filter((tour) => {
//         return tour.city === city
//     })
//     renderTours(filtredTours)
// }

// function filtredToursRating(tours, rating) {
//     const filtredTours = tours.filter((tour) => {
//         return tour.rating === rating
//     })
//     renderTours(filtredTours)
// }

init();