export interface BurgerImageProps {
	containerMaxHeight: number;
    containerMaxWidth: number;
    orderId: string;
}

export interface BurgerGroup {
	_type: string;
	categoryId: string;
	showVisual: boolean;
	category: string;
	sortOrder: number;
	type: 'checkbox' | 'radio' | 'switch';
	options: BurgerOptions[];
}

export interface BurgerOptions {
	id: string;
    sortOrder: number;
	value: string;
	added: boolean;
	info: BurgerInfo;
	image: {
		asset: {
			_ref: string;
		};
	};
	visual: {
		width: number;
		height: number;
		bottom: {
			id: string;
			image: {
				asset: {
					_ref: string;
				};
			};
			visual: { width: number; height: number };
		};
	};
}

export interface BurgerInfo {
	weight: number;
	cost: number;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	about: string;
}

export interface BurgerIngredientImageProps {
	height: number;
	width: number;
    id: string;
	i: number;
	top: number;
    src: string;
}


export interface ItemsVisible {
	height: number;
	width: number;
	id: string;
    image: {
        asset: {
            _ref: string;
        }
    }
}
