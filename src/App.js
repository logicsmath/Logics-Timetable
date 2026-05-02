import { useState, useEffect, useRef } from "react";

/* ═══ DATA ═══ */
const MIDDLE = [
  { day:"월",time:"4:30~7:00",name:"중등2",cls:"c2",group:"중등2과정" },
  { day:"화",time:"4:30~7:00",name:"중등2",cls:"c2b",group:"중등2과정" },
  { day:"목",time:"4:30~7:00",name:"중등2",cls:"c2",group:"중등2과정" },
  { day:"금",time:"4:30~7:00",name:"중등2",cls:"c2b",group:"중등2과정" },
  { day:"화",time:"4:30~7:00",name:"중등3",cls:"c3",group:"중등3과정" },
  { day:"금",time:"4:30~7:00",name:"중등3",cls:"c3",group:"중등3과정" },
  { day:"토",time:"1:00~3:30",name:"중등 공수1",cls:"cm1",group:"공수1과정" },
  { day:"수",time:"4:30~7:00",name:"중등 공수1",cls:"cm1",group:"공수1과정" },
  { day:"화",time:"7:00~10:00",name:"중등 공수1",cls:"cm1",group:"공수1과정" },
  { day:"금",time:"7:00~10:00",name:"중등 공수1",cls:"cm1",group:"공수1과정" },
  { day:"월",time:"4:30~7:00",name:"중등 공수2",cls:"cm2",group:"공수2과정" },
  { day:"목",time:"4:30~7:00",name:"중등 공수2",cls:"cm2",group:"공수2과정" },
  { day:"화",time:"7:00~10:00",name:"중등 공수2",cls:"cm2",group:"공수2과정" },
  { day:"금",time:"7:00~10:00",name:"중등 공수2",cls:"cm2",group:"공수2과정" },
  { day:"월",time:"4:30~7:00",name:"브릿지",cls:"bridge",group:"브릿지" },
  { day:"화",time:"4:30~7:00",name:"브릿지",cls:"bridge",group:"브릿지" },
  { day:"수",time:"4:30~7:00",name:"브릿지",cls:"bridge",group:"브릿지" },
  { day:"목",time:"4:30~7:00",name:"브릿지",cls:"bridge",group:"브릿지" },
  { day:"금",time:"4:30~7:00",name:"브릿지",cls:"bridge",group:"브릿지" },
];
const HIGH = [
  { day:"토",time:"3:30~6:30",name:"고1 공통수학S반",cls:"hs",group:"공통S반" },
  { day:"월",time:"7:00~10:00",name:"고1 공통수학S반",cls:"hs",group:"공통S반" },
  { day:"수",time:"7:00~10:00",name:"고1 공통수학S반",cls:"hs",group:"공통S반" },
  { day:"목",time:"7:00~10:00",name:"고1 공통수학S반",cls:"hs",group:"공통S반" },
  { day:"월",time:"7:00~10:00",name:"고등 공통A반",cls:"ha",group:"공통A반" },
  { day:"화",time:"7:00~10:00",name:"고등 공통A반",cls:"ha",group:"공통A반" },
  { day:"목",time:"7:00~10:00",name:"고등 공통A반",cls:"ha",group:"공통A반" },
  { day:"금",time:"7:00~10:00",name:"고등 공통A반",cls:"ha",group:"공통A반" },
  { day:"토",time:"9:30~12:00",name:"고2 수Ⅰ·수Ⅱ",cls:"h2",group:"고2" },
  { day:"일",time:"9:30~12:00",name:"고2 수Ⅰ·수Ⅱ",cls:"h2",group:"고2" },
  { day:"월",time:"7:00~10:00",name:"고3 수Ⅰ",cls:"h3",group:"고3" },
  { day:"수",time:"7:00~10:00",name:"고3 확률과 통계",cls:"h3b",group:"고3" },
  { day:"목",time:"7:00~10:00",name:"고3 수Ⅱ",cls:"h3c",group:"고3" },
];

const C = {
  c2:{bg:"#1a3a5c",color:"#7ab8f5",border:"#378ADD"},
  c2b:{bg:"#1a3a5c",color:"#7ab8f5",border:"#378ADD"},
  c3:{bg:"#4a3010",color:"#f0c060",border:"#BA7517"},
  cm1:{bg:"#4a1a2a",color:"#f0a0c0",border:"#D4537E"},
  cm2:{bg:"#2a2850",color:"#b0a8f0",border:"#7F77DD"},
  hs:{bg:"#1a3a1a",color:"#90d870",border:"#639922"},
  ha:{bg:"#3a1a2a",color:"#f0a0c0",border:"#993556"},
  h2:{bg:"#0e2a4a",color:"#70b0e8",border:"#185FA5"},
  h3:{bg:"#3a1a0a",color:"#f0a070",border:"#D85A30"},
  h3b:{bg:"#3a2a00",color:"#f0d060",border:"#F5A623"},
  h3c:{bg:"#2a1040",color:"#c8a0f0",border:"#9C27B0"},
  bridge:{bg:"#1e1e1e",color:"#aaa",border:"#666"},
};

const DAYS = ["월","화","수","목","금","토","일"];
const STD_P = {"월":"A","목":"A","화":"B","금":"B","수":"C","토":"C","일":"X"};
const WKD_P = {"토":"W","일":"W","월":"X","화":"X","수":"X","목":"X","금":"X"};
const PC = {
  A:{bg:"rgba(55,138,221,0.06)",hi:"rgba(55,138,221,0.18)",hdr:"#5a9ee6",hdrH:"#78b4f0"},
  B:{bg:"rgba(220,140,40,0.06)",hi:"rgba(220,140,40,0.18)",hdr:"#d4943a",hdrH:"#f0b050"},
  C:{bg:"rgba(80,180,90,0.06)",hi:"rgba(80,180,90,0.18)",hdr:"#58b860",hdrH:"#70d878"},
  W:{bg:"rgba(130,100,220,0.06)",hi:"rgba(130,100,220,0.18)",hdr:"#9080e0",hdrH:"#a898f0"},
  X:{bg:"transparent",hi:"transparent",hdr:"#555",hdrH:"#555"},
};

const MSUBS = [
  {key:"중등2과정",label:"중등2과정",accent:"#378ADD"},
  {key:"중등3과정",label:"중등3과정",accent:"#BA7517"},
  {key:"공수1과정",label:"공수1과정",accent:"#D4537E"},
  {key:"공수2과정",label:"공수2과정",accent:"#7F77DD"},
];
const HGRADES = [
  {key:"고1",label:"고1",accent:"#639922",kids:true},
  {key:"고2",label:"고2",accent:"#185FA5",kids:false},
  {key:"고3",label:"고3",accent:"#D85A30",kids:false},
];
const G1 = [
  {key:"공통S반",label:"공통S반 (기본)",accent:"#639922"},
  {key:"공통A반",label:"공통A반 (심화)",accent:"#993556"},
];

/* ═══ EFFECTS ═══ */
function CursorGlow(){
  const r=useRef(null);
  useEffect(()=>{
    const el=r.current;if(!el)return;
    let raf;
    const m=e=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{el.style.setProperty("--cx",e.clientX+"px");el.style.setProperty("--cy",e.clientY+"px");});};
    window.addEventListener("mousemove",m);
    return()=>{window.removeEventListener("mousemove",m);cancelAnimationFrame(raf);};
  },[]);
  return <div ref={r} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(600px circle at var(--cx,50%) var(--cy,50%),rgba(200,180,255,0.04) 0%,transparent 60%)"}} />;
}

/* ═══ SCHEDULE TABLE ═══ */
function Tbl({data,pairMode="std"}){
  const [hk,setHk]=useState(null);
  const ord=["9:30~12:00","1:00~3:30","3:30~6:30","4:30~7:00","7:00~10:00"];
  const ts=ord.filter(t=>data.some(d=>d.time===t));
  if(!ts.length)return null;
  const pairs=pairMode==="weekend"?WKD_P:STD_P;
  const isSub=pairMode==="subject";

  const colBg=(d,h)=>{if(isSub)return h?"rgba(255,255,255,0.03)":"transparent";const g=pairs[d]||"X";return h?PC[g].hi:PC[g].bg;};
  const hdrC=(d,h)=>{if(isSub)return d==="토"?"#5a9ee6":d==="일"?"#d4943a":"#666";const g=pairs[d]||"X";return h?PC[g].hdrH:PC[g].hdr;};
  const isDH=d=>{if(isSub)return false;const g=pairs[d]||"X";return g!=="X"&&hk===g;};
  const isIH=n=>isSub&&hk===n;

  return(
    <div onMouseLeave={()=>setHk(null)} style={{overflowX:"auto",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.02)",backdropFilter:"blur(8px)"}}>
      <table style={{width:"100%",borderCollapse:"collapse",minWidth:620,tableLayout:"fixed"}}>
        <colgroup><col style={{width:76}} />{DAYS.map(d=><col key={d} />)}</colgroup>
        <thead><tr>
          <th style={{padding:"14px 4px",fontSize:11,fontWeight:700,color:"#555",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.06)",textAlign:"center",letterSpacing:1}}>TIME</th>
          {DAYS.map(d=>{
            const h=isDH(d);
            return <th key={d} onMouseEnter={()=>{if(!isSub){const g=pairs[d]||"X";if(g!=="X")setHk(g);}}}
              style={{padding:"14px 2px",fontSize:13,fontWeight:800,textAlign:"center",color:hdrC(d,h),background:colBg(d,h),borderBottom:`1px solid ${h?hdrC(d,h)+"44":"rgba(255,255,255,0.06)"}`,transition:"all .25s ease",letterSpacing:1}}>{d}</th>;
          })}
        </tr></thead>
        <tbody>{ts.map(t=>(
          <tr key={t}>
            <td style={{padding:"10px 4px",fontSize:10.5,fontWeight:600,color:"#555",background:"rgba(255,255,255,0.02)",textAlign:"center",verticalAlign:"top",whiteSpace:"nowrap",borderBottom:"1px solid rgba(255,255,255,0.04)",letterSpacing:0.5}}>{t}</td>
            {DAYS.map(d=>{
              const dh=isDH(d);
              const items=data.filter(x=>x.day===d&&x.time===t);
              return(
                <td key={d} onMouseEnter={()=>{if(!isSub){const g=pairs[d]||"X";if(g!=="X")setHk(g);}}}
                  style={{padding:3,verticalAlign:items.length?"top":"middle",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.04)",background:colBg(d,dh),transition:"background .25s ease"}}>
                  {items.length?(
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      {items.map((it,i)=>{
                        const s=C[it.cls]||C.bridge;
                        const sh=isIH(it.name);
                        return(
                          <div key={i} onMouseEnter={()=>{if(isSub)setHk(it.name);}}
                            style={{
                              background:sh?s.border+"30":s.bg,color:s.color,
                              borderLeft:`3px solid ${s.border}`,borderRadius:6,
                              padding:"7px 6px",fontSize:11,fontWeight:700,lineHeight:1.35,textAlign:"left",
                              transform:(dh||sh)?"scale(1.02)":"scale(1)",
                              boxShadow:sh?`0 0 12px ${s.border}44`:dh?`0 0 6px ${s.border}15`:"none",
                              outline:sh?`1.5px solid ${s.border}`:"none",
                              transition:"all .2s ease",cursor:isSub?"pointer":"default",
                            }}>{it.name}</div>
                        );
                      })}
                    </div>
                  ):<span style={{color:"#2a2a2a",fontSize:11}}>—</span>}
                </td>
              );
            })}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

/* ═══ UI PARTS ═══ */
function Back({onClick,label="← 뒤로"}){
  return <button className="bk" onClick={onClick} style={{background:"rgba(255,255,255,0.05)",borderRadius:10,padding:"9px 18px",color:"rgba(255,255,255,0.5)",fontSize:12,fontWeight:600,cursor:"pointer",border:"1px solid rgba(255,255,255,0.06)",outline:"none"}}>{label}</button>;
}

function Sel({items,onSelect,cols=2}){
  return(
    <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:10,maxWidth:cols>=3?480:360,width:"100%"}}>
      {items.map((it,i)=>(
        <button key={it.key} className="sb" onClick={()=>onSelect(it)} style={{
          padding:"20px 14px",borderRadius:14,
          background:`linear-gradient(135deg,${it.accent}dd,${it.accent}88)`,
          boxShadow:`0 4px 20px ${it.accent}33`,
          display:"flex",flexDirection:"column",alignItems:"center",gap:4,
          animation:`fu .45s ease ${i*.06}s both`,cursor:"pointer",border:"none",outline:"none",
        }}>
          <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{it.label}</span>
          {it.desc&&<span style={{fontSize:9.5,color:"rgba(255,255,255,0.5)",fontWeight:500}}>{it.desc}</span>}
        </button>
      ))}
    </div>
  );
}

const CP=({children})=><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"48px 20px",animation:"fu .5s ease"}}>{children}</div>;
const PH=({t,s})=><><h2 style={{fontSize:24,fontWeight:900,color:"#eee",letterSpacing:-.8,marginBottom:6}}>{t}</h2><p style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginBottom:36,letterSpacing:.5}}>{s}</p></>;

function getPM(t){if(t==="고2")return"weekend";if(t==="고3")return"subject";return"std";}

/* ═══ MAIN ═══ */
export default function App(){
  const [pg,setPg]=useState("home");
  const [sd,setSd]=useState([]);
  const [st,setSt]=useState("");
  const [bc,setBc]=useState([]);

  const home=()=>setPg("home");
  const open=(d,t,c)=>{setSd(d);setSt(t);setBc(c);setPg("sch");};

  return(
    <div style={{fontFamily:"'Pretendard','Noto Sans KR',-apple-system,sans-serif",background:"#0c0e14",minHeight:"100vh",position:"relative",color:"#fff"}}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        *{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-text-size-adjust:100%}
        @keyframes fu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes lineGrow{from{width:0}to{width:60px}}
        .nb{cursor:pointer;border:none;outline:none;transition:all .3s cubic-bezier(.4,0,.2,1)}
        .nb:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,.4)!important}
        .nb:active{transform:translateY(-1px) scale(.98)}
        .sb{transition:all .25s cubic-bezier(.4,0,.2,1)}
        .sb:hover{transform:translateY(-2px) scale(1.03);filter:brightness(1.15);box-shadow:0 8px 28px rgba(0,0,0,.3)!important}
        .bk{transition:all .2s ease}.bk:hover{background:rgba(255,255,255,.1)!important;border-color:rgba(255,255,255,.12)!important}
        @media(max-width:480px){
          .hero-title{font-size:26px!important}
          .hero-sub{font-size:11px!important;letter-spacing:2px!important}
          .hero-btns{flex-direction:column!important;gap:12px!important}
          .hero-btns>button{min-width:100%!important}
        }
      `}</style>

      {/* BG */}
      <div style={{position:"fixed",inset:0,zIndex:0,background:"radial-gradient(ellipse at 30% 20%,rgba(100,20,50,.15) 0%,transparent 55%),radial-gradient(ellipse at 70% 80%,rgba(20,40,100,.12) 0%,transparent 50%)"}} />
      <CursorGlow />

      <div style={{position:"relative",zIndex:1,minHeight:"100vh",display:"flex",flexDirection:"column"}}>

        {/* ════ HOME ════ */}
        {pg==="home"&&(
          <CP>
            {/* Top line accent */}
            <div style={{width:60,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)",marginBottom:32,animation:"lineGrow .8s ease both"}} />

            <p style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.25)",letterSpacing:4,marginBottom:12,textTransform:"uppercase",animation:"fu .5s ease .1s both"}}>Excellence in Mathematics</p>

            <h1 className="hero-title" style={{
              fontSize:36,fontWeight:900,letterSpacing:-1.5,textAlign:"center",lineHeight:1.3,
              color:"transparent",
              backgroundImage:"linear-gradient(90deg,#e8e8e8 0%,#c0c0c0 30%,#fff 50%,#c0c0c0 70%,#e8e8e8 100%)",
              backgroundSize:"200% auto",backgroundClip:"text",WebkitBackgroundClip:"text",
              animation:"fu .5s ease .15s both, shimmer 8s linear 1s infinite",
              marginBottom:6,
            }}>로직스수학학원</h1>

            <h2 style={{fontSize:16,fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:1,marginBottom:8,animation:"fu .5s ease .2s both"}}>통합시간표</h2>

            <p className="hero-sub" style={{fontSize:12,color:"rgba(255,255,255,.2)",fontWeight:400,letterSpacing:3,marginBottom:48,animation:"fu .5s ease .25s both"}}>
              LOGICS MATH ACADEMY
            </p>

            {/* 2 buttons */}
            <div className="hero-btns" style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",width:"100%",maxWidth:440}}>
              {[
                {k:"mid",l:"중등부 시간표",d:"중2 · 중3 · 공수",grad:"linear-gradient(135deg,rgba(55,138,221,.12),rgba(55,138,221,.04))"},
                {k:"hi",l:"고등부 시간표",d:"고1 · 고2 · 고3",grad:"linear-gradient(135deg,rgba(220,100,50,.12),rgba(220,100,50,.04))"},
              ].map((x,i)=>(
                <button key={x.k} className="nb" onClick={()=>setPg(x.k)} style={{
                  flex:"1 1 190px",minWidth:190,padding:"28px 20px",
                  background:x.grad,backdropFilter:"blur(12px)",
                  borderRadius:16,border:"1px solid rgba(255,255,255,.06)",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:8,
                  animation:`fu .6s ease ${.3+i*.1}s both`,
                }}>
                  <span style={{fontSize:16,fontWeight:800,color:"#e0e0e0",letterSpacing:-.3}}>{x.l}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.25)",fontWeight:500}}>{x.d}</span>
                </button>
              ))}
            </div>

            {/* Bottom line */}
            <div style={{width:40,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)",marginTop:48,animation:"fu .5s ease .5s both"}} />
          </CP>
        )}

        {/* ════ 중등부 ════ */}
        {pg==="mid"&&(
          <CP>
            <div style={{position:"absolute",top:20,left:20}}><Back onClick={home} label="← 처음으로" /></div>
            <PH t="중등부" s="과정을 선택하세요" />
            <Sel cols={2} items={MSUBS.map(s=>({...s,desc:MIDDLE.some(d=>d.group===s.key)?"시간표 보기":"편성 예정"}))} onSelect={s=>open(MIDDLE.filter(d=>d.group===s.key),s.label,["처음","중등부"])} />
          </CP>
        )}

        {/* ════ 고등부 ════ */}
        {pg==="hi"&&(
          <CP>
            <div style={{position:"absolute",top:20,left:20}}><Back onClick={home} label="← 처음으로" /></div>
            <PH t="고등부" s="학년을 선택하세요" />
            <Sel cols={3} items={HGRADES.map(g=>({...g,desc:g.kids?"반 선택":"시간표 보기"}))} onSelect={g=>{if(g.key==="고1")setPg("g1");else open(HIGH.filter(d=>d.group===g.key),g.label,["처음","고등부"]);}} />
          </CP>
        )}

        {/* ════ 고1 ════ */}
        {pg==="g1"&&(
          <CP>
            <div style={{position:"absolute",top:20,left:20}}><Back onClick={()=>setPg("hi")} label="← 고등부" /></div>
            <PH t="고1" s="반을 선택하세요" />
            <Sel cols={2} items={G1.map(s=>({...s,desc:"시간표 보기"}))} onSelect={s=>open(HIGH.filter(d=>d.group===s.key),s.label,["처음","고등부","고1"])} />
          </CP>
        )}

        {/* ════ SCHEDULE ════ */}
        {pg==="sch"&&(
          <div style={{padding:"0 0 48px",animation:"fi .4s ease",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
            {/* Header bar */}
            <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <Back onClick={()=>{
                const p=bc[bc.length-1];
                if(!p||p==="처음")home();
                else if(p==="중등부")setPg("mid");
                else if(p==="고1")setPg("g1");
                else if(p==="고등부")setPg("hi");
                else home();
              }} />
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
                  {bc.map((c,i)=><span key={i} style={{fontSize:10,color:"rgba(255,255,255,.2)",fontWeight:500}}>{c}{i<bc.length-1&&<span style={{margin:"0 3px",opacity:.4}}>/</span>}</span>)}
                </div>
                <h3 style={{fontSize:16,fontWeight:800,color:"#ddd",margin:0,letterSpacing:-.3}}>{st}</h3>
              </div>
            </div>

            {/* Table */}
            <div style={{flex:1,maxWidth:900,width:"100%",margin:"0 auto",padding:"24px 16px 0"}}>
              {sd.length===0?(
                <div style={{textAlign:"center",padding:"48px 20px",background:"rgba(255,255,255,.02)",borderRadius:12,border:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{fontSize:36,marginBottom:10,opacity:.25}}>📋</div>
                  <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,.3)"}}><span style={{color:"#999"}}>{st}</span> 수업이 아직 편성되지 않았습니다</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.15)",marginTop:5}}>추후 업데이트 예정</div>
                </div>
              ):(
                <Tbl data={sd} pairMode={getPM(st)} />
              )}

              {/* Clinic note */}
              <div style={{marginTop:20,padding:"14px 16px",background:"rgba(255,255,255,.02)",borderRadius:10,border:"1px solid rgba(255,255,255,.04)"}}>
                <p style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:500,lineHeight:1.6}}>
                  *클리닉시간은 주말에 진행하며 2시간으로 이루어 집니다.
                </p>
              </div>
            </div>

            {/* Home button */}
            <div style={{textAlign:"center",marginTop:32,paddingBottom:16}}>
              <Back onClick={home} label="처음으로 돌아가기" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}