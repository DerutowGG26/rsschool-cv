// document.addEventListener('DOMContentLoaded', () => {
//     // 1. БАЗА ДАННЫХ ПОДАРКОВ
//     const gifts = [
//         { id: 1, title: 'Golden Star', cat: 'work', img: 'assets/images/gift-1.jpg', desc: 'A star to guide your career path.', ratings: { sweet: 2, joy: 4, magic: 5, health: 3 } },
//         { id: 2, title: 'Red Ball', cat: 'health', img: 'assets/images/gift-2.jpg', desc: 'Stay active and healthy all year.', ratings: { sweet: 1, joy: 5, magic: 2, health: 5 } },
//         { id: 3, title: 'Silver Bell', cat: 'harmony', img: 'assets/images/gift-3.jpg', desc: 'Brings peace and calm to your home.', ratings: { sweet: 3, joy: 3, magic: 4, health: 4 } },
//         { id: 4, title: 'Pine Cone', cat: 'work', img: 'assets/images/gift-4.jpg', desc: 'Boost your focus and productivity.', ratings: { sweet: 2, joy: 3, magic: 5, health: 3 } },
//         { id: 5, title: 'Snowman', cat: 'health', img: 'assets/images/gift-5.jpg', desc: 'Vitamin boost in every bite.', ratings: { sweet: 5, joy: 4, magic: 1, health: 4 } },
//         { id: 6, title: 'Magic Lamp', cat: 'harmony', img: 'assets/images/gift-6.jpg', desc: 'Sleep better with magical light.', ratings: { sweet: 1, joy: 4, magic: 5, health: 5 } },
//         { id: 7, title: 'Gingerbread', cat: 'health', img: 'assets/images/gift-7.jpg', desc: 'Homemade taste of health.', ratings: { sweet: 4, joy: 5, magic: 2, health: 3 } },
//         { id: 8, title: 'Nutcracker', cat: 'work', img: 'assets/images/gift-8.jpg', desc: 'Strength for hard tasks.', ratings: { sweet: 2, joy: 2, magic: 4, health: 4 } }
//     ];

//     const isHomePage = document.body.classList.contains('home-page');
//     const giftsGrid = document.getElementById('giftsGrid');
//     const modal = document.getElementById('modal');
//     const closeModalBtn = document.getElementById('closeModal');
    
//     // 2. БУРГЕР МЕНЮ
//     const burger = document.getElementById('burger');
//     const navList = document.querySelector('.nav__list');
    
//     if (burger && navList) {
//         burger.addEventListener('click', () => {
//             burger.classList.toggle('active');
//             navList.classList.toggle('active');
//             document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
//         });

//         document.querySelectorAll('.nav__link').forEach(link => {
//             link.addEventListener('click', () => {
//                 burger.classList.remove('active');
//                 navList.classList.remove('active');
//                 document.body.style.overflow = '';
//             });
//         });
//     }

//     // 3. ОТРИСОВКА КАРТОЧЕК
//     function renderGifts(filter = 'all') {
//         if (!giftsGrid) return;
//         giftsGrid.innerHTML = '';

//         let list = isHomePage ? gifts.slice(0, 4) : gifts.filter(g => filter === 'all' || g.cat === filter);

//         list.forEach(gift => {
//             const card = document.createElement('div');
//             card.className = 'card';
//             card.dataset.id = gift.id; 
            
//             card.innerHTML = `
//                 <img src="${gift.img}" alt="${gift.title}">
//                 <div class="card__info">
//                     <span class="tag">FOR ${gift.cat.toUpperCase()}</span>
//                     <h3 class="h3">${gift.title}</h3>
//                 </div>
//             `;
//             giftsGrid.appendChild(card);
//         });
//     }

//     // 4. ЛОГИКА МОДАЛКИ (Event Delegation)
//     document.addEventListener('click', (e) => {
//         const card = e.target.closest('.card');
//         if (card && modal) {
//             const giftId = parseInt(card.dataset.id);
//             const gift = gifts.find(g => g.id === giftId);
            
//             if (gift) {
//                 document.getElementById('mImg').src = gift.img;
//                 document.getElementById('mTag').innerText = `FOR ${gift.cat.toUpperCase()}`;
//                 document.getElementById('mTitle').innerText = gift.title;
//                 document.getElementById('mDesc').innerText = gift.desc;

//                 const ratingsWrap = document.getElementById('mRatings');
//                 ratingsWrap.innerHTML = '';
//                 Object.entries(gift.ratings).forEach(([key, value]) => {
//                     let stars = '';
//                     for (let i = 1; i <= 5; i++) {
//                         stars += `<span class="star-icon ${i <= value ? 'filled' : ''}">❄</span>`;
//                     }
//                     ratingsWrap.innerHTML += `
//                         <div class="rating-row">
//                             <span class="rating-name">${key}</span>
//                             <div>${stars}</div>
//                         </div>`;
//                 });

//                 modal.classList.add('active');
//                 document.body.style.overflow = 'hidden';
//             }
//         }
//     });

//     if (closeModalBtn) {
//         closeModalBtn.onclick = () => {
//             modal.classList.remove('active');
//             document.body.style.overflow = '';
//         };
//     }
//     window.onclick = (e) => {
//         if (e.target === modal) {
//             modal.classList.remove('active');
//             document.body.style.overflow = '';
//         }
//     };

//     // 5. ТАЙМЕР
//     if (isHomePage) {
//         const updateTimer = () => {
//             const diff = new Date(`Jan 1, ${new Date().getFullYear() + 1}`) - new Date();
//             if (diff > 0) {
//                 document.getElementById('days').innerText = Math.floor(diff / 864e5);
//                 document.getElementById('hours').innerText = Math.floor((diff / 36e5) % 24);
//                 document.getElementById('minutes').innerText = Math.floor((diff / 6e4) % 60);
//                 document.getElementById('seconds').innerText = Math.floor((diff / 1e3) % 60);
//             }
//         };
//         setInterval(updateTimer, 1000); updateTimer();
//     }

//     // 6. ИДЕАЛЬНЫЙ СЛАЙДЕР
//     if (isHomePage) {
//         const track = document.getElementById('sliderTrack');
//         const next = document.getElementById('nextBtn');
//         const prev = document.getElementById('prevBtn');
//         let position = 0;

//         if (track && next && prev) {
//             const updateSlider = () => {
//                 // Берем точную позицию нужного слайда в пикселях
//                 let offset = track.children[position].offsetLeft;
                
//                 // Высчитываем максимальное смещение, чтобы не было пустого белого пространства справа
//                 let maxOffset = track.scrollWidth - track.parentElement.offsetWidth;
//                 if (maxOffset < 0) maxOffset = 0; // Если вьюпорт шире слайдов, не двигаем
                
//                 // Ограничиваем сдвиг: не даем уйти дальше максимального значения
//                 if (offset > maxOffset) {
//                     offset = maxOffset;
//                 }

//                 track.style.transform = `translateX(-${offset}px)`;
                
//                 prev.disabled = position === 0;
//                 // Отключаем кнопку "вперед", если достигли визуального конца ленты или последнего индекса
//                 next.disabled = offset >= maxOffset || position === track.children.length - 1;
//             };

//             // При повороте экрана телефона пересчитываем позицию и возвращаем в начало во избежание багов
//             window.addEventListener('resize', () => {
//                 position = 0;
//                 updateSlider();
//             });

//             next.onclick = () => { 
//                 if (position < track.children.length - 1) {
//                     position++; 
//                     updateSlider(); 
//                 }
//             };
            
//             prev.onclick = () => { 
//                 if (position > 0) {
//                     position--; 
//                     updateSlider(); 
//                 }
//             };
            
//             // Небольшая задержка перед первым запуском, чтобы шрифты и картинки успели прогрузиться и задать ширину
//             setTimeout(updateSlider, 100);
//         }
//     }

//     // 7. ТАБЫ
//     if (!isHomePage) {
//         document.querySelectorAll('.tab').forEach(t => {
//             t.addEventListener('click', () => {
//                 document.querySelector('.tab.active').classList.remove('active');
//                 t.classList.add('active');
//                 renderGifts(t.dataset.filter);
//             });
//         });
//     }

//     renderGifts();
// });
document.addEventListener('DOMContentLoaded', () => {
    // 1. БАЗА ДАННЫХ
    const gifts = [
        { id: 1, title: 'Притягивает баги', cat: 'work', img: 'assets/images/gift-1.jpg', desc: 'Способен находить ошибки в коде так, будто они были добавлены туда намеренно.', ratings: { 'жить': '+500', 'создавать': '+500', 'любовь': '+200', 'мечтать': '+400' } },
        { id: 2, title: 'Console.log Guru', cat: 'work', img: 'assets/images/gift-2.jpg', desc: 'Использует console.log как хрустальный шар для обнаружения любых проблем.', ratings: { 'жить': '+500', 'создавать': '+500', 'любовь': '+200', 'мечтать': '+400' } },
        { id: 3, title: 'Быстрый способ обмана', cat: 'health', img: 'assets/images/gift-3.jpg', desc: 'Знает все сочетания клавиш так, будто родился с ними.', ratings: { 'жить': '+500', 'создавать': '+500', 'любовь': '+400', 'мечтать': '+200' } },
        { id: 4, title: 'Мастер слияния', cat: 'work', img: 'assets/images/gift-4.jpg', desc: 'Объединяет ветки в Git без конфликтов, как виртуоз на экзамене.', ratings: { 'жить': '+200', 'создавать': '+500', 'любовь': '+200', 'мечтать': '+300' } },
        { id: 5, title: 'Шептун по документации', cat: 'harmony', img: 'assets/images/gift-5.jpg', desc: 'Разбирается в непонятных документах так, как будто сам их написал.', ratings: { 'жить': '+500', 'создавать': '+500', 'любовь': '+200', 'мечтать': '+100' } },
        { id: 6, title: 'Мастер обратной связи', cat: 'harmony', img: 'assets/images/gift-6.jpg', desc: 'Принимает изменения от клиентов с дзен-спокойствием Будды.', ratings: { 'жить': '+300', 'создавать': '+500', 'любовь': '+300', 'мечтать': '+400' } },
        { id: 7, title: 'Код минималистичный', cat: 'health', img: 'assets/images/gift-7.jpg', desc: 'Пишет код настолько лаконично, что одна строка выполняет больше действий, чем весь файл.', ratings: { 'жить': '+500', 'создавать': '+500', 'любовь': '+500', 'мечтать': '+200' } },
        { id: 8, title: 'Волшебник, безупречный до пикселя', cat: 'harmony', img: 'assets/images/gift-8.jpg', desc: 'Выравнивает элементы по последнему пикселю, даже если дизайн выглядит абстрактным.', ratings: { 'жить': '+500', 'создавать': '+500', 'любовь': '+400', 'мечтать': '+400' } }
    ];

    const categoryLabels = {
        work: 'Для работы',
        health: 'Для здоровья',
        harmony: 'Для гармонии'
    };

    const getGiftTag = (gift) => categoryLabels[gift.cat] || `FOR ${gift.cat.toUpperCase()}`;

    const isHomePage = document.body.classList.contains('home-page');
    const giftsGrid = document.getElementById('giftsGrid');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // БУРГЕР МЕНЮ
    const burger = document.getElementById('burger');
    const navList = document.querySelector('.nav__list');
    
    if (burger && navList) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ОТРИСОВКА КАРТОЧЕК
    function renderGifts(filter = 'all') {
        if (!giftsGrid) return;
        giftsGrid.innerHTML = '';

        let list = isHomePage ? gifts.slice(0, 4) : gifts.filter(g => filter === 'all' || g.cat === filter);

        list.forEach(gift => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.id = gift.id; 
            
            card.innerHTML = `
                <img src="${gift.img}" alt="${gift.title}">
                <div class="card__info">
                    <span class="tag">${getGiftTag(gift)}</span>
                    <h3 class="h3">${gift.title}</h3>
                </div>
            `;
            giftsGrid.appendChild(card);
        });
    }

    // ИДЕАЛЬНАЯ ЛОГИКА МОДАЛКИ (Event Delegation)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card && modal) {
            const giftId = parseInt(card.dataset.id);
            const gift = gifts.find(g => g.id === giftId);
            
            if (gift) {
                // Заполняем данные
                document.getElementById('mImg').src = gift.img;
                document.getElementById('mTag').innerText = getGiftTag(gift);
                document.getElementById('mTitle').innerText = gift.title;
                document.getElementById('mDesc').innerText = gift.desc;

                // Рейтинг
                const ratingsWrap = document.getElementById('mRatings');
                ratingsWrap.innerHTML = '';
                Object.entries(gift.ratings).forEach(([key, value]) => {
                    const numericValue = parseInt(String(value).replace('+', ''), 10) || 0;
                    const powerLevel = Math.max(1, Math.min(5, Math.round(numericValue / 100)));
                    let stars = '';
                    for (let i = 1; i <= 5; i++) {
                        const value = powerLevel;
                        stars += `<span class="star-icon ${i <= value ? 'filled' : ''}">❄</span>`;
                    }
                    ratingsWrap.innerHTML += `
                        <div class="rating-row">
                            <span class="rating-name">${key}</span>
                            <div>${value} ${stars}</div>
                        </div>`;
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Закрытие
    if (closeModalBtn) {
        closeModalBtn.onclick = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
    }
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ТАЙМЕР
    if (isHomePage) {
        const updateTimer = () => {
            const diff = new Date(`Jan 1, ${new Date().getFullYear() + 1}`) - new Date();
            if (diff > 0) {
                document.getElementById('days').innerText = Math.floor(diff / 864e5);
                document.getElementById('hours').innerText = Math.floor((diff / 36e5) % 24);
                document.getElementById('minutes').innerText = Math.floor((diff / 6e4) % 60);
                document.getElementById('seconds').innerText = Math.floor((diff / 1e3) % 60);
            }
        };
        setInterval(updateTimer, 1000); updateTimer();
    }

    // ТАБЫ
    if (!isHomePage) {
        document.querySelectorAll('.tab').forEach(t => {
            t.addEventListener('click', () => {
                document.querySelector('.tab.active').classList.remove('active');
                t.classList.add('active');
                renderGifts(t.dataset.filter);
            });
        });
    }

    // Slider controls on the home page.
    if (isHomePage) {
        const track = document.getElementById('sliderTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const viewport = track?.parentElement;

        if (track && prevBtn && nextBtn && viewport && track.children.length > 0) {
            const slides = Array.from(track.children);
            let currentIndex = 0;
            let maxOffset = 0;

            const getOffsetByIndex = (index) => {
                const slide = slides[index];
                if (!slide) return 0;
                return Math.min(slide.offsetLeft, maxOffset);
            };

            const updateButtons = () => {
                const currentOffset = getOffsetByIndex(currentIndex);
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentOffset >= maxOffset;
            };

            const renderSlider = () => {
                const currentOffset = getOffsetByIndex(currentIndex);
                track.style.transform = `translateX(-${currentOffset}px)`;
                updateButtons();
            };

            const recalcSlider = () => {
                maxOffset = Math.max(track.scrollWidth - viewport.clientWidth, 0);
                currentIndex = Math.min(currentIndex, slides.length - 1);

                while (currentIndex > 0 && slides[currentIndex].offsetLeft > maxOffset) {
                    currentIndex -= 1;
                }

                renderSlider();
            };

            nextBtn.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    currentIndex += 1;
                    renderSlider();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex -= 1;
                    renderSlider();
                }
            });

            window.addEventListener('resize', recalcSlider);
            window.addEventListener('load', recalcSlider);

            recalcSlider();
        }
    }

    renderGifts();
});
