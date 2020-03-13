import * as $ from 'jquery';

function createAnalytics (): object {
	let counter = 0;
	let isDestroyed: boolean = false;
	const listener = (): number => counter++;
	$(document).on('click', listener);
	return {
		destroy(){
			$(document).off('click', listener)
			isDestroyed = true;
			return 'Analytics is destroyed';
		},
		getClicks(){
			if (isDestroyed){
				return 'Analytics is destroyed';
			}
			return counter;
		}
	}
}

window['analytics'] = createAnalytics();