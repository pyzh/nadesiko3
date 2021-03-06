const assert = require('assert')
const NakoCompiler = require('../src/nako3')

describe('関数呼び出しテスト', () => {
  const nako = new NakoCompiler()
  // nako.debugParser = true
  // nako.debug = true
  const cmp = (code, res) => {
    if (nako.debug) {
      console.log('code=' + code)
    }
    assert.equal(nako.runReset(code).log, res)
  }
  const cmd = (code) => {
    if (nako.debug) console.log('code=' + code)
    nako.runReset(code)
  }

  beforeEach(() => {
    cmd('「Asia/Tokyo」でタイムゾーン設定')
  })
  // --- test ---
  it('関数式の呼び出し - 足す(2,3)を表示。', () => {
    cmp('足す(2,3)を表示。', '5')
  })
  it('四則演算を連文で', () => {
    cmp('1に2を足して3を掛けて3で割って2を引いて表示', '1')
  })
  it('「そう」のテスト', () => {
    cmp('３が１以上。もしそうならば「真」と表示。', '真')
  })
  it('後方で定義した関数を前方で使う1', () => {
    cmp('HOGE(3,4)を表示;●(A,B)HOGEとは、それはA+B;', '7')
    cmp('「姫」と「殿」が出会って表示;●(AとBが)出会うとは、それはA&B;', '姫殿')
  })
  it('後方で定義した関数を前方で使う2', () => {
    cmp('Nとは変数=30;HOGE(3,4)を表示;●(A,B)HOGEとは;それはA+B+N;', '37')
  })
  it('代入と表示', () => {
    cmp('A=今日;もし(今日=A)ならば「1」と表示', '1')
  })
  it('**には**構文 - 基本', () => {
    cmp('実行には;「あ」と表示←', 'あ')
  })
  it('**には**構文 - 配列カスタムソート', () => {
    cmp('A=[5,1,3];Aを配列カスタムソートするには(a,b)それはb-a←;Aを「:」で配列結合して表示', '5:3:1')
  })
  it('階乗計算 - 再帰', () => {
    cmp('●(VをAのBで)階乗計算とは;' +
      'もし、Bが0以下ならば、Vを戻す。;(V*A)をAの(B-1)で階乗計算して戻す。' +
      'ここまで。;1を2の3で階乗計算して表示。', 8)
  })
  it('連続文後の代入', () => {
    cmp('1504191600を日時変換して「 」まで切り取り、対象日に代入。対象日を表示。', '2017/09/01')
  })
  it('連続文後の=代入', () => {
    cmp('対象日=1504191600を日時変換して「 」まで切り取る。対象日を表示。', '2017/09/01')
  })
  // ---
})
