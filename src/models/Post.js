export default class Post {
	constructor(title, img) {
		  this.title = title;
		  this.date = new Date();
		  this.img = img;
	}
	// будет сериализовать данные этого поста
	toString(){
		// оборачивает в строку объекты/массивы
		return JSON.stringify({
			title: this.title,
			date: this.date,
			img: this.img,
		}, null, 2);
	}
}