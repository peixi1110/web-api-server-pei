// import * as echarts from 'echarts'
// import { useEffect } from 'react';

const Home = () => {

    // useEffect(() => {
    //     // make sure dom avaliable
    //     // get dom node
    //     const  chartDom = document.getElementById('main');
    //     // init
    //     const  myChart = echarts.init(chartDom);
    //     // chart parameter
    //     const option = {
    //         xAxis: {
    //             type: 'category',
    //             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: [
    //             {
    //             data: [120, 200, 150, 80, 70, 110, 130],
    //             type: 'bar'
    //         }]
    //     }

    //     // use parameter to complete rendring 
    //     option && myChart.setOption(option);
    // }, [])

    return (
    <div>
        {/*<div id='main' style={{width: '500px', height: '400px'}}>
        </div>*/}
        This is Home
    </div>
    )
}

export default Home