var vm = new Vue({
	el: "#app",
	data: {
        bing: [{
            id: '1',
            name: '兵人10'
        }, {
            id: '1',
            name: '兵人50'
        }, {
            id: '1',
            name: '兵人100'
        }, {
            id: '1',
            name: '兵人200'
        }],
        shu: [{
            id: '1',
            name: '关羽'
        }, {
            id: '2',
            name: '张飞'
        }, {
            id: '3',
            name: '赵云'
        }, {
            id: '4',
            name: '黄忠'
        }, {
            id: '5',
            name: '马超'
        }],
        wei: [{
            id: '1',
            name: '许褚'
        }, {
            id: '2',
            name: '庞德'
        }, {
            id: '3',
            name: '夏侯惇'
        }],
        wu: [{
            id: '1',
            name: '周瑜'
        }, {
            id: '2',
            name: '吕蒙'
        }, {
            id: '3',
            name: '陆逊'
        }]
    },
	methods:{
        add: function(){
            this.bing.push({ name: '新兵' });
        }
    }
});
