;(function() {

	class Apple {
		constructor(id, age, parent) {
			this.id = id;
			this.age = age;
			this.location = 'На дереве';
			this.state = 'Зреет';
			this.parentTree = parent;
		}

		getFullInfo() { 		// возвращает строку, содержащую всю доступную информацию о конкретном яблоке
			return `id яблока: ${this.id}\nid дерева: ${this.parentTree}\nвозраст: ${this.age}\nместоположение: ${this.location}\nсостояние: ${this.state}`;
		}
		
		getAge() { 				// возвращает число, возраст яблока
			return this.age;
		}

		getLocation() { 		// возвращает строку, местонахождение яблока
			return this.location;
		}

		getState() { 			// возвращает строку, состояние зрелости яблока
			return this.state;
		}
	}



	class AppleTree {
		constructor(id, age, k) {
			this.id = id;
			this.age = age;
			this.allTimeApples = k;
			this.onTreeApples = k;
			this.freshApples = k;
			this.groundApples = 0;
			this.badApples = 0;
			this.apples = (function() { // генерация списка яблок
				const arr = [];
				
				for (let i = 0; i < k; i++) {
					const age = Math.floor(Math.random() * 30);
					const apple = new Apple(i, age, id);

					arr.push(apple);
				}

				return arr;
			})();
		}

		getFullInfo() { 		// возвращает строку, содержащую всю доступную информацию о конкретной яблоне
			return `id яблони: ${this.id}\nвозраст: ${this.age}\nкол-во висящих яблок: ${this.freshApples}\nкол-во упавших яблок: ${this.groundApples}\nкол-во испортивщихся яблок: ${this.badApples}`;
		}

		getAge() { 				// возвращает число, возраст яблони
			return this.age;
		}

		getCountApples() { 		// возвращиет число, кол-во яблок на яблоне
			return this.onTreeApples;
		}

		getAppleList() {		// возвращает массив, список всех яблок на яблоне
			return this.apples;
		}
	}



	class Garden {
		constructor(name = 'My Garden') {
			const n = Math.floor(Math.random() * 100) + 1; 		// изначальное кол-во деревьев (от 1 до 100)
			const k = Math.floor(Math.random() * 101); 			// изначальное кол-во яблок на деревьях (от 0 до 100)

			document.title = name;								// меняет название страницы и заголовка
			document.querySelector('h1').innerHTML = name;		// в HTML при создании нового экземпляра

			this.name = name;
			this.age = 0;
			this.countTrees = n;
			this.allTimeApples = n * k;
			this.onTreeApples = n * k;
			this.freshApples = n * k;
			this.groundApples = 0;
			this.badApples = 0;
			this.allTimeBadApples = 0;
			this.appleTrees = (function() { 					// генерация списка яблонь
				const arr = [];

				for (let i = 0; i < n; i++) {
					const age = Math.floor(Math.random() * 30);
					const appleTree = new AppleTree(i, age, k);

					arr.push(appleTree);
				}

				return arr;
			})();
			
		}

		passDay(num = 1) { // метод увеличивающий возраст сада, деревьев и яблок на заданное число или на 1 день(по умолчанию)
			let count = 0;
			
			do {
				this.age++;

				for (let i = 0; i < this.countTrees; i++) { // цикл по проходу по списку деревьев
					const appleTree = this.appleTrees[i]
					let length = appleTree.apples.length;
					
					appleTree.age++;

					if (appleTree.age % 30 === 0) { 										// каждые 30 дней на яблоне начинает расти
						const maxNewApple = 100 - length;									// новое поколение яблок, при этом не превышая
						const countNewApples = Math.floor(Math.random() * maxNewApple); 	// максимальное значение(100) массива со списком яблок

						for(let k = 0; k <= countNewApples; k++) {
							appleTree.apples.push(new Apple(appleTree.allTimeApples, 0, i));
							appleTree.allTimeApples++;
							appleTree.onTreeApples++;
							appleTree.freshApples++;


							this.allTimeApples++;
							this.onTreeApples++;
							this.freshApples++;
						}
					}

					for (let j = 0; j < length; j++) { 		// цикл по проходу по списку яблок на одном из деревьев
						const apple = this.appleTrees[i].apples[j];
						
						apple.age++;
						
						if (apple.age === 30) { 			// спустя 30 дней зрения на дереве, яблоко падает на землю
							apple.location = 'На земле';
							apple.state = 'Спелое';

							appleTree.onTreeApples--;
							appleTree.groundApples++;
							
							this.onTreeApples--;
							this.groundApples++;
						}

						if (apple.age === 31) { 			// спустя 1 день после падения, яблоко портится
							apple.state = 'Испорчено';

							appleTree.freshApples--;
							appleTree.badApples++;

							this.freshApples--;
							this.badApples++;
							this.allTimeBadApples++;
						}

						if (apple.age === 60) { 			// спустя 30 дней после падения, яблоко полностью разлагается
							appleTree.apples.splice(j, 1);	// и удаляется из массива
							length--;
							j--;

							appleTree.badApples--;
							appleTree.groundApples--;

							this.badApples--;
							this.groundApples--;
						}
					}
				}

				count++;

			} while (count < num);
		}

		getAge() {						// возвращает число, возраст сада
			return this.age;
		}

		getCountAppleTrees() {			// возвращает число, кол-во деревьев в саду
			return this.countTrees;
		}

		getCountApples() {				// возвращает число, кол-во яблок висящих на всех деревьях в саду
			return this.onTreeApples;
		}

		getTreeList() {					// возвращает массив, список всех яблонь в саду
			return this.appleTrees;
		}

		getInfoAboutTree(treeId) {		// возвращает экземпляр класса AppleTree по конкретному ID
			
			if (this.appleTrees[treeId]) {
				return this.appleTrees[treeId];
			} else {
				return 'Яблоня с таким id отсутствует.'
			}

		}

		getInfoAboutApple(treeId, appleId) { // возвращает экземпляр класса Apple по конкретным ID

			if (this.appleTrees[treeId]) {
				
				if (this.appleTrees[treeId].apples[appleId]) {
					return this.appleTrees[treeId].apples[appleId];
				} else {
					return 'Яблоко с таким id отсутствует.';
				}

			} else {
				return 'Яблоня с таким id отсутствует.';
			}

		}

		
	}



	/*
	Создание экземпляра класса и 
	всех вспомогательных переменных/функций
	для отображения в HTML-файле
	*/
	const garden = new Garden('Eternal Blossom Garden');

	const displayAge = document.querySelector('.age');
	const displayAppleTrees = document.querySelector('.apple-trees');
	const displayOnTreeApples = document.querySelector('.on-tree-apples');
	const displayGroundApples = document.querySelector('.ground-apples');
	const displayBadApples = document.querySelector('.bad-apples');
	const inputNumber = document.querySelector('input.number');
	const btnPassDay = document.querySelector('.btn-pass-day');

	function passDay() {
		if (+inputNumber.value < 1) { 		// ограничение минимального и максимального
			inputNumber.value = 1; 			// значения вводимого числа в input,
		} 									// (0 < value <= 365) 

		if (+inputNumber.value > 365) {
			inputNumber.value = 365;
		}

		garden.passDay(+inputNumber.value);
	}

	function showInfoInHTML() {
		
		displayAge.innerHTML = garden.age;
		displayAppleTrees.innerHTML = garden.appleTrees.length;
		displayOnTreeApples.innerHTML = garden.onTreeApples;
		displayGroundApples.innerHTML = garden.groundApples;
		displayBadApples.innerHTML = garden.badApples;

	}

	window.onload = showInfoInHTML;

	btnPassDay.addEventListener('click', passDay);
	btnPassDay.addEventListener('click', showInfoInHTML);

})();