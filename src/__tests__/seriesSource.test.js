import seriesGenerator from '../data/series';

let gen;

beforeEach(() => {
    gen = seriesGenerator();
});

it('can generate 10 items', () => {
    let series = [];
    for(let i = 0; i < 10; i++) {
        series.push(gen.next().value);
    }
    expect(series.length).toEqual(10);
});

it('is possible to limit generation', () => {
    let gen = seriesGenerator(5);
    let series = [];
    for (let i = 0; i<10; i++) {
        series.push(gen.next().value);
    }
    expect(series.length).toEqual(10);
    expect(series[5]).toBeUndefined();
});