// 初始化 LeanCloud
AV.init({
    appId: "cOuC5XOQIrdldlVyhsn3oBTl-gzGzoHsz",      // 替换为你的 AppID
    appKey: "pj25H9APFZNCIE99zZVhPGei",    // 替换为你的 AppKey
    serverURL: "VSCBqxNDWLxDGmUZguyoZxJi" // 替换为你的 ServerURL
});

// 添加道路名称
async function addRoads() {
    const input = document.getElementById('roadNames').value;
    const roadNames = input.split('\n').filter(name => name.trim() !== '');

    if (roadNames.length === 0) {
        alert('请输入至少一个道路名称！');
        return;
    }

    // 保存到 LeanCloud
    const Road = AV.Object.extend('Road');
    const roads = roadNames.map(name => {
        const road = new Road();
        road.set('name', name);
        return road;
    });

    try {
        await AV.Object.saveAll(roads);
        alert('道路名称已添加！');
    } catch (error) {
        alert('添加失败：' + error.message);
    }
}

// 随机显示五个路名
async function getRandomRoads() {
    const query = new AV.Query('Road');
    const roads = await query.find(); // 获取所有道路名称

    const resultList = document.getElementById('result');
    resultList.innerHTML = '';

    if (roads.length === 0) {
        resultList.innerHTML = '<li>没有可显示的道路名称。</li>';
        return;
    }

    // 随机选取五个
    const shuffled = roads.sort(() => 0.5 - Math.random());
    const randomRoads = shuffled.slice(0, 5).map(road => road.get('name'));

    randomRoads.forEach(road => {
        const li = document.createElement('li');
        li.textContent = road;
        resultList.appendChild(li);
    });
}
