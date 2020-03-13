async function start() {
	return await Promise.resolve('async is working')
}
start().then(console.log)

let unusedVariable = 5;
console.log(unusedVariable);

// для демонстрации возможностей плагинов babel
// это еще не в стандарте, (proposal)
class Util {
	static id = Date.now();
}
console.log('Util.id: ', Util.id)
