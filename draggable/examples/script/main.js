var vm = new Vue({
	el: "#main",
	data: {
		list:[{name:"John"}, 
				{name:"Joao"}, 
                {name:"Jean"}
        ],
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
            this.list.push({name:'Juan'});
        },
        replace: function(){
            this.list=[{name:'Edgard'}]
        }
    }
});
