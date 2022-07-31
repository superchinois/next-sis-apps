const fetcher = (url, options={}) => fetch(url, options).then(res=>res.json());

const customers_data = [
    {
        "cardcode": "C82191",
        "cardname": "BOUTIK TI BOUT'CHOU",
        "time": "13:42",
        "linetotal": 11255.42,
        "docnums": [
            890902
        ]
    },
    {
        "cardcode": "C83243",
        "cardname": "SNACK LE SAMOUSSAS DU SUD",
        "time": "11:00",
        "linetotal": 4501.71,
        "docnums": [
            890820
        ]
    },
    {
        "cardcode": "C01720",
        "cardname": "C'LABO",
        "time": "14:18",
        "linetotal": 3186.36,
        "docnums": [
            890967
        ]
    },
    {
        "cardcode": "C82146",
        "cardname": "CHOUCHOU PEI",
        "time": "07:45",
        "linetotal": 1953.19,
        "docnums": [
            890712
        ]
    },
    {
        "cardcode": "C80153",
        "cardname": "CHEZ JO",
        "time": "09:55",
        "linetotal": 1847.77,
        "docnums": [
            890774
        ]
    },
    {
        "cardcode": "C83929",
        "cardname": "CHEZ MANOUTE",
        "time": "11:10",
        "linetotal": 1682.36,
        "docnums": [
            890829
        ]
    },
    {
        "cardcode": "C81440",
        "cardname": "CORNETS REUNION",
        "time": "10:47",
        "linetotal": 1270.0,
        "docnums": [
            890811
        ]
    },
    {
        "cardcode": "C83871",
        "cardname": "RIHO/LANGEVIN",
        "time": "12:21",
        "linetotal": 1268.08,
        "docnums": [
            890870
        ]
    }];
export {
    fetcher, customers_data
};