	//推荐
	exports.recommend = {
		type:"recommendList",
		topBar:[
			{id:1,name:'推荐'},
			{id:2,name:'运动户外'},
			{id:3,name:'服饰内衣'},
			{id:4,name:'鞋靴箱包'},
			{id:5,name:'美妆个护'},
			{id:6,name:'家具数码'},
			{id:7,name:'食品母婴'},
		],
		indexSwiper:[
			{imgUrl:'/static/image/one.jpeg'},
			{imgUrl:'/static/image/two.jpeg'},
			{imgUrl:'/static/image/three.jpeg'},
			{imgUrl:'/static/image/four.jpeg'},
			{imgUrl:'/static/image/five.jpeg'},
			{imgUrl:'/static/image/six.jpeg'},
		],
		recommend:[
			{
				bigUrl:'/static/image/six.jpeg',
				data:[
					{smallUrl:'/static/image/four.jpeg'},
					{smallUrl:'/static/image/five.jpeg'},
					{smallUrl:'/static/image/six.jpeg'},
				]
			},
			{
				bigUrl:'/static/image/five.jpeg',
				data:[
					{smallUrl:'/static/image/four.jpeg'},
					{smallUrl:'/static/image/one.jpeg'},
					{smallUrl:'/static/image/six.jpeg'},
				]
			}
		],
		commodity:[
				{
					id:1,
					imgSrc:'/static/image/one.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:2,
					imgSrc:'/static/image/two.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:3,
					imgSrc:'/static/image/three.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:4,
					imgSrc:'/static/image/four.jpeg',
					title:'最新爆款',
					oprice:800,
					nprice:300
				},
				{
					id:5,
					imgSrc:'/static/image/five.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:6,
					imgSrc:'/static/image/six.jpeg',
					title:'最新爆款',
					oprice:800,
					nprice:300
				}
		],
		
	}
	
	//运动
	exports.sport = {
		type:"sportList",
		banner:'/static/image/one.jpeg',
		icon:[
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
			{
				imgUrl:'/static/image/four.jpeg',
				text:'Saber',
			},
		],
		hot:[
				{
					id:1,
					imgSrc:'/static/image/one.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:2,
					imgSrc:'/static/image/two.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:3,
					imgSrc:'/static/image/three.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:4,
					imgSrc:'/static/image/four.jpeg',
					title:'最新爆款',
					oprice:800,
					nprice:300
				},
				{
					id:5,
					imgSrc:'/static/image/five.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:6,
					imgSrc:'/static/image/six.jpeg',
					title:'最新爆款',
					oprice:800,
					nprice:300
				}
		],
		shop:[
				{
					id:1,
					imgSrc:'/static/image/one.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:2,
					imgSrc:'/static/image/two.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:3,
					imgSrc:'/static/image/three.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:4,
					imgSrc:'/static/image/four.jpeg',
					title:'最新爆款',
					oprice:800,
					nprice:300
				},
				{
					id:5,
					imgSrc:'/static/image/five.jpeg',
					title:'最新爆款',
					oprice:600,
					nprice:300
				},
				{
					id:6,
					imgSrc:'/static/image/six.jpeg',
					title:'最新爆款',
					oprice:800,
					nprice:300
				}
		],	
	}
	
	//分类
	exports.list = {
		data:[
			{
				id:1,
				name:'Saber1',
				data:[
					{
						id:1,
						name:'Saber1-1',
						list:[
							{
								id:1,
								name:'saber1-1-1',
								imgUrl:'/static/image/one.jpeg',
							},
							{
								id:2,
								name:'saber1-1-2',
								imgUrl:'/static/image/two.jpeg',
							}
						]						
					},
					{
						id:2,
						name:'Saber1-2',
						list:[
							{
								id:1,
								name:'saber1-2-1',
								imgUrl:'/static/image/three.jpeg',
							},
							{
								id:2,
								name:'saber1-2-2',
								imgUrl:'/static/image/four.jpeg',
							}
						]						
					}

				]
			},
			{
				id:2,
				name:'Saber2',
				data:[
					{
						id:1,
						name:'Saber2-1',
						list:[
							{
								id:1,
								name:'saber2-1-1',
								imgUrl:'/static/image/six.jpeg',
							},
							{
								id:2,
								name:'saber2-1-2',
								imgUrl:'/static/image/five.jpeg',
							}
						]						
					},
					{
						id:2,
						name:'Saber2-2',
						list:[
							{
								id:1,
								name:'saber2-2-1',
								imgUrl:'/static/image/four.jpeg',
							},
							{
								id:2,
								name:'saber2-2-2',
								imgUrl:'/static/image/three.jpeg',
							}
						]						
					}

				]
			},
				
		]
	}