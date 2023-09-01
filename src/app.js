async function listTours() {

    const respanse = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours')
    const tours = await respanse.json()

    console.log(tours)

    tours.forEach(tour => {
        document.getElementById('container-tours').innerHTML +=`
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
                    <span
                        class="text-gray-400 pt-6 px-1"
                        aria-hidden="true"
                        >&middot;</span
                    >
                    <span
                        class="montserrat text-base md:text-base lg:text-lg font-medium text-gray-400"
                    >
                        ${tour.city}
                    </span>
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
                <div class="absolute bottom-0 overflow-hidden pr-8">
                    <img
                        class="bg-gray-300 object-cover"
                        src="src\images\line-tickets.png"
                        alt="Отрывная линия"
                    />
                </div>
            </div>
            <div class="p-8 bg-white rounded-40">
                <div class="flex gap-4 pb-3">
                    <p
                        class="font-medium text-sm md:text-base lg:text-lg text-gray-400"
                    >
                        ${tour.startTime}
                    </p>
                    <p
                        class="font-medium text-sm md:text-base lg:text-lg text-gray-400"
                    >
                        ${tour.endTime}
                    </p>
                </div>
                <p
                    class="montserrat text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 pb-4"
                >
                    ${tour.price} руб.
                </p>
                <div class="flex gap-3 flex-wrap">
                    <button id="btn-booking" class="btn-primary">Забронировать</button>
                    <button id="btn-favorites" class="btn-secondary">В избранное</button>
                </div>
            </div>
        </div>
        `
    });

}

listTours()