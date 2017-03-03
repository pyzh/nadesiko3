const assert = require('assert');
const NakoCompiler = require('../src/nako3.js');

describe('PluginSystem test', ()=>{
  const nako = new NakoCompiler();
  nako.debug = true;
  const cmp = (code, res) => {
    if (nako.debug) {
      console.log("code=" + code);
    }
    assert.equal(nako.run_reset(code).log, res);
  };
  // --- test ---
  it('ナデシコエンジンを表示', ()=> {
    cmp("ナデシコエンジンを表示", "nadesi.com/v3");
  });
  it('四則演算', ()=> {
    cmp("1に2を足して3を掛けて表示", "9");
    cmp("10を2で割って表示", "5");
    cmp("10を2で割った余り;それを表示", "0");
  });
  it('JS実行', ()=> {
    cmp("「3+6」をJS実行して表示", "9");
    cmp("「Math.floor(3.5)」をJS実行して表示", "3");
  });
  it('型変換', ()=> {
    cmp("「3.14」を文字列変換して表示", "3.14");
    cmp("「0xFF」を整数変換して表示", "255");
  });
  it('変数型確認', ()=> {
    cmp("30の変数型確認して表示。", "number");
  });
  it('SIN/COS/TAN', ()=> {
    cmp("SIN(1)を表示。", Math.sin(1));
    cmp("COS(1)を表示。", Math.cos(1));
    cmp("TAN(1)を表示。", Math.tan(1));
  });
  it('RGB', ()=> {
    cmp("RGB(255,255,0)を表示。", "#ffff00");
  });
  it('LOGN', ()=> {
    cmp("LOGN(10,10)を表示。", Math.LOG10E * Math.log(10));
    cmp("LOGN(2,10)を表示。", Math.LOG2E * Math.log(10));
  });
  it('文字挿入', ()=> {
    cmp("「12345」の2に「**」を文字挿入して表示", "1**2345");
    cmp("「12345」の1に「**」を文字挿入して表示", "**12345");
    cmp("「12345」の6に「**」を文字挿入して表示", "12345**");
    cmp("「12345」の0に「**」を文字挿入して表示", "**12345");
  });
  it('出現回数', ()=> {
    cmp("「aabbccaabbcc」で「aa」の出現回数。表示", "2");
    cmp("「aa**bb**cc」で「**」の出現回数。表示", "2");
    cmp("「aa.+bb.+cc」で「.+」の出現回数。表示", "2");
  });
  it('シングル文字列', ()=> {
    cmp("'abcd'を表示。", "abcd");
  });
  it('文字抜き出す', ()=> {
    cmp("MID('abcdef',1,2)を表示", "ab");
    cmp("MID('abcdefg',3,2)を表示", "cd");
    cmp("MID('abcd',4,2)を表示", "d");
  });
  it('RIGHT', ()=> {
    cmp("RIGHT('abcdef',2)を表示", "ef");
    cmp("「abcde」の3だけ文字右部分。それを表示", "cde");
  });
  it('LEFT', ()=> {
    cmp("LEFT('abcd',2)を表示", "ab");
    cmp("「abcde」の3だけ文字左部分。それを表示", "abc");
  });
  it('切り取る', ()=> {
    cmp("「abc,def,ghi」から「,」まで切り取る。それを表示。", "abc");
    cmp("「a,b,c」から「*」まで切り取る。それを表示。", "a,b,c");
  });
  it('文字削除', ()=> {
    cmp("「abcd」の1から2だけ文字削除。それを表示。", "cd");
    cmp("「abcd」の2から2だけ文字削除。それを表示。", "ad");
  });
  it('置換', ()=> {
    cmp("「a,b,c」の「,」を「-」に置換して表示。", "a-b-c");
    cmp("「e,f,g」の「,」を「-」へ単置換して表示。", "e-f,g");
  });
  it('空白除去', ()=> {
    cmp("「  aaa   」の空白除去して表示。", "aaa");
  });
  it('四捨五入', ()=> {
    cmp("6を四捨五入して表示。", "10");
    cmp("13を四捨五入して表示。", "10");
    cmp("14を四捨五入して表示。", "10");
    cmp("39を四捨五入して表示。", "40");
    cmp("35を四捨五入して表示。", "40");
  });
  it('正規表現置換', ()=> {
    cmp("「aa,bb,cc」の「[a-z]+」を「x」で正規表現置換して表示。", "x,x,x");
    cmp("「aa,bb,cc」の「/[a-z]+/」を「x」で正規表現置換して表示。", "x,bb,cc");
    cmp("「aa,bb,cc」の「/[a-z]+/g」を「x」で正規表現置換して表示。", "x,x,x");
  });
  it('正規表現マッチ', ()=> {
    cmp("「aa,bb,cc」を「[a-z]+」で正規表現マッチ。JSONエンコード。表示。", '["aa","bb","cc"]');
  });
  it('正規表現区切る', ()=> {
    cmp("「aa,bb,cc」を「/\,/g」で正規表現区切る。JSONエンコード。表示。", '["aa","bb","cc"]');
  });
  it('通貨形式', ()=> {
    cmp("12345を通貨形式。表示。", '12,345');
    cmp("1000を通貨形式。表示。", '1,000');
  });
  it('ゼロ埋め', ()=> {
    cmp("10を3でゼロ埋め。表示。", '010');
    cmp("123を5でゼロ埋め。表示。", '00123');
    cmp("12345を3でゼロ埋め。表示。", '12345');
  });
  it('配列要素数', ()=> {
    cmp("A=[0,1,2,3];Aの配列要素数。表示。", '4');
    cmp('A={"a":1,"b":2,"c":3};Aの配列要素数。表示。', '3');
  });
  it('配列一括挿入', ()=> {
    cmp("A=[1,1,1];Aの1に[0,0]を配列一括挿入。JSONエンコード。表示。", '[1,0,0,1,1]');
  });
});

