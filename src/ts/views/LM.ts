

      interface Result { 
            chisq:number,//
            lamdaLow: number,//
            lamdaHigh: number,//
            lamdaInit: number,//
            deltachi:number,//
            tolerance:number,//
            params:number[],//
            alpha:number[][]  //
            dfRealPartX:number[], //
            dfRealPartY: number[], //
            dfImaginaryPartX: number[], //
            dfImaginaryPartY: number[], //
            imaginaryPartX:number[], //
            imaginaryPartY:number[], //
            difference:number[],//
        }


        export default class LM  {
        //Declaramos e iniciamos variables
        NDONE=1;  ITMAX=20;
        ndat=0; ma=0;  mfit=0;
        x=[]; y:number[]=[]; sig:number[]=[];
        ia=[true];
        xi:number=0;
        ochisq=0;
        gridType?:number=2;
        lamdaInit: number=0.1; 
        tol=0.1
        lamdaHigh: number=100;
        lamdaLow:   number=0.001;    
        oneda:number[][]=[[]]
        beta:number[]=[]
        a:number[]=[]
        covar:number[][]=[[]];
        alpha:number[][]=[[]];
        chisq=0;
        ymod: number=0; 
        wt: number=0;
        sig2i: number=0;
        dy: number=0;
        dyda:number[]=[]
        atry:number[]=[]
        da:number[]=[]
        temp:number[][]=[[]];
        malla:number[]=[]
        w:number[]=[]
        delta:number[]=[]
        triangularModel:number[]=[]


//constructor de la clase se ejecuta al crear la clase
constructor(partY:any,partX:any,a?:number[],iterMax?:number,NDone?:number,gridType?:number,tol?:number,lamdaInit?:number,lamdaLow?:number,lamdaHigh?:number) {
       
        
        //Copia la seleccion del usuario para iniciar 
        if(lamdaInit){
            this.lamdaInit=lamdaInit
        }else{
            this.lamdaInit=0.1
        }
        if(lamdaHigh){
            this.lamdaHigh=lamdaHigh
        }else{
            this.lamdaHigh=10
        }
        if(lamdaLow){
            this.lamdaLow=lamdaLow
        }else{
            this.lamdaLow=0.001
        }
        if(tol){
            this.tol=tol
        }else{
            this.tol=0.01
        }
        if(iterMax){
            this.ITMAX=iterMax
        }else{
            this.ITMAX=5
        }
        if(NDone){
            this.NDONE=NDone
        }else{          
            this.NDONE=1
        }

        if(partX&&partY){
            this.ma=partY.length
            this.x=partY        
            this.w=partX
            this.ndat=partY.length
        }
        if(gridType!==undefined){
          
        this.gridType=gridType
        if(this.gridType===1){  for(let i=1; i<this.ndat-1;i++){
          this.malla[i-1]=((this.w[i+1]+this.w[i-1])/2);
         
         }
        } if( this.gridType===2){  for(let i=1; i<this.ndat-1;i++){
          this.malla[i-1]=((this.w[i+1]-this.w[i-1])/2)+this.w[i-1]; 
       
         }    
        } if( this.gridType===3){ 
          
          for(let i=1; i<this.ndat-1;i++){
               this.malla[i-1]=((this.w[i]-this.w[i-1])/2)+this.w[i-1];  
            } 
      } if(this.gridType===4){  for(let i=1; i<this.ndat-1;i++){
          
          this.malla[i-1]= ((this.w[i]+this.w[i-1])/2);
        }}
  
       } else {
          for(let i=1; i<this.ndat-1;i++){
            
            this.malla[i-1]= ((this.w[i]+this.w[i-1])/2);
          } 
      }
          for(let i=1; i<this.ndat-1;i++){
              if(( this.w[i-1]<this.malla[i-1])&&(this.malla[i-1]<=this.w[i])){
                   this.triangularModel[i-1]=(this.malla[i-1]-this.w[i-1])/(this.w[i]-this.w[i-1])      
              } else if((this.w[i]<this.malla[i-1])&&(this.malla[i-1]<this.w[i+1])){
                   this.triangularModel[i-1]=(this.w[i+1]-this.malla[i-1])/(this.w[i+1]-this.w[i])  
              } else {
                   this.triangularModel[i-1]=0.0  
              }
     }   
     
     this.y=this.triangularModel     
     this.ndat=this.y.length 

     if(a!==undefined){
             this.a=a
      }else{
      for(let i=0; i<this.ma; i++){        
             this.a[i]=1;
      }
    }
     // array of initial parameter values
        for (let i=0;i<this.ma;i++){
            this.ia[i] = true
        };
        
        for(let i=0; i<this.ma; i++){
            this.sig[i]=1;
          }
    }
              
    fit(): Result {                

        
          let j,k,l,iter,done=0;
          let alamda=this.lamdaInit;
          let atry:number[]=[]
          let beta:number[]=[]
          let da:number[]=[]
          for(j=0;j<this.ma;j++){
            
            if(!this.atry[j]){
              atry[j]=1
          }
          if(!this.beta[j]){
            beta[j]=0
            }
            if(!this.da[j]){
            da[j]=0
          }
        }
  
        this.mfit=0;


        for(j=0;j<this.ma;j++){
            if(this.ia[j]){
                this.mfit++;
            }
        }
        
        for( j=0; j<this.mfit;j++){
           if(!this.oneda[j]){
            this.oneda[j]=[]
        }
          
          for(let k=0; k<=1 ;k++){
             this.oneda[j][k]=0
        }  
     
        if(!this.temp[j]){
          this.temp[j]=[]
          }  
      for(let k=0; k<=j;k++){
          this.temp[j][k]=0
      } 
      }
        
         
      for( j=0; j<this.ma;j++){
        if(!this.alpha[j]){
         this.alpha[j]=[]
     }
       
       for(let k=0; k<=j ;k++){
          this.alpha[j][k]=0
        }  
  
       if(!this.covar[j]){
       this.covar[j]=[]
       }  

        for(let k=0; k<=j;k++){
            this.covar[j][k]=0
        } 
   }
        this.mrqconf1() ////////Inicializacion
 

         for(j=0;j<this.ma;j++){ //copía parametros
            this.atry[j]=this.a[j]
          }
          this.ochisq=this.chisq;//copia chisq
          
          for(iter=0;iter<this.ITMAX;iter++) {       
              if(done===this.NDONE){// final step
                alamda=0.0
              }
              
              for(let j=0; j<this.mfit;j++){//calcula el campio de parametros en covar
              
                    for(let k=0;k<this.mfit;k++){                        
                      this.covar[j][k]=this.alpha[j][k];                      
                    }

                    this.covar[j][j]=this.alpha[j][j]*(1.0+alamda);

                    for(k=0;k<this.mfit;k++){// aqui temp es alpha
                      this.temp[j][k]=this.covar[j][k]
  
                    }

                    this.oneda[j][0]=this.beta[j] //copian beta a oneda  
              }
  
              
               this.gaussj();     // resuelven temp y oneda //alpha * delta = beta
               
               
              for(let j=0;j<this.mfit;j++){
                for(let k=0;k<this.mfit;k++){
                   this.covar[j][k]=this.temp[j][k]
                }
                   this.da[j]=this.oneda[j][0]
              }
        
              if(done===this.NDONE){          
                this.covsrtCovar(); 
                this.covsrtAlpha();                
                break
              } 

               for(let l=0, j=0;l<this.ma;l++){
                    if(this.ia[l]){
                      this.atry[l]=this.a[l]+this.da[j++]
                    }
               }        
               
               this.mrqconf2();

           
               if(Math.abs(this.chisq-this.ochisq)<Math.max(this.tol,this.tol*this.chisq)){
                     done++;
               }
            
               if(this.chisq<this.ochisq){
                     alamda*=this.lamdaLow;
                     this.ochisq=this.chisq;

                     for(j=0;j<this.mfit;j++){
                         for(k=0;k<this.mfit;k++){
                           this.alpha[j][k]=this.covar[j][k]
                         }
                       this.beta[j]=this.da[j];
                     }
                     for(l=0;l<this.ma;l++){
                       this.a[l]=this.atry[l]
                     }
               } else {                                  
                     alamda *=this.lamdaHigh;
                     this.chisq=this.ochisq;    
               }
          }

      var evarepsilon1: number[]=[];
      var evarepsilon1Y: number[]=[];
      var evarepsilon2Y: number[]=[];

       for(let i=1; i<this.w.length-1;i++){
           evarepsilon1[i-1]=(1/Math.PI)*(this.g(this.malla[i-1],this.w[i-1])/(this.w[i]-this.w[i-1])-(((this.w[i+1]-this.w[i-1])*this.g(this.malla[i-1],this.w[i]))/((this.w[i]-this.w[i-1])*(this.w[i+1]-this.w[i])))+ this.g(this.malla[i-1],this.w[i+1])/(this.w[i+1]-this.w[i]))
       }
    
      for(let i=1; i<this.a.length-1; i++) {
           evarepsilon1Y[i-1]=this.a[i]*evarepsilon1[i-1];
      }
     
      for(let i=1; i<this.a.length-1; i++) {
          evarepsilon2Y[i-1]=this.a[i]*this.triangularModel[i-1];
      }

      let evarX=[]
        
      for(let i=1; i<this.a.length-1; i++) {
         evarX[i-1]=this.malla[i-1]
      }
      
     
      this.covsrtCovar(); 
      this.covsrtAlpha();

      let realPartYC=evarepsilon1Y
      let imaginaryPartYC=evarepsilon2Y
      let imaginaryPartYA=this.x
      let newAlpha=this.alpha
      let newDelta=0
      let change=0
        
      for(let j=0;j<this.a.length-2;j++){
                for(let i=-1;i<0;i= imaginaryPartYC[j]-imaginaryPartYA[j]){  
                
                    newDelta= Math.sqrt(0.0000000000000001*newAlpha[j][j])
                    change+=newDelta

                    imaginaryPartYC[j]=change+imaginaryPartYC[j]

                           
                 }   
                realPartYC[j]=change+realPartYC[j]  
                change=0;
       }
       
      let diff:number[]=[]
      for(let i=1; i<this.a.length-1; i++) {
             diff[i-1]=(imaginaryPartYC[i-1]-imaginaryPartYA[i-1])*100
      }

      let res;

      res={
          dfRealPartX:[...evarX], 
          dfRealPartY: [...realPartYC ],
          dfImaginaryPartX: [...evarX],
          dfImaginaryPartY: [...imaginaryPartYC],
          imaginaryPartX:this.w,
          imaginaryPartY:this.x,
          chisq:this.chisq,  
          lamdaLow: this.lamdaLow,
          lamdaHigh: this.lamdaHigh,
          lamdaInit: this.lamdaInit,
          deltachi:0,
          tolerance:this.tol,
          params:this.a, 
          alpha:this.alpha,
          difference:[...diff]                  
        }

          return res;
      }
    
      g(x: number, y: number){
        
        let result= (x+y)*Math.log10(Math.abs(x+y))+(x-y)*Math.log10(Math.abs(x-y))
        return result
      }

      mrqconf1(){
            let i=0,j=0,k=0,l=0,m=0;
            let dy=0;
            let wt=0;

            this.sig2i=1;
            
          for(j=0;j<this.ma;j++){
            if(!this.dyda[j]){
              this.dyda[j]=1
            }
          }
        
          for(j=0;j<this.mfit;j++){     
            if(!this.alpha[j]){
              this.alpha[j]=[]
          }

          for(k=0;k<=j;k++){
              this.alpha[j][k]=0
          }
          this.beta[j]=0
          }
        
          this.chisq=0;
          
          for(i=0;i<this.ndat;i++){
              this.xi=this.x[i]
              this.funcs1();
              this.sig2i=1.0/(this.sig[i]*this.sig[i])///sigma*22
                
              dy=this.y[i]-this.ymod;
              
              for( j=0, l=0;l<this.ma;l++){
                    if(this.ia[l]){
                          wt=this.dyda[l]*this.sig2i;
                          
                          for(k=0, m=0;m<l+1;m++){
                              if(this.ia[m]){  
                                  this.alpha[j][k++] += wt*this.dyda[m]
                            
                              }
                          }
                          this.beta[j++] += dy*wt;
                       
                      }
                }
                this.chisq +=dy*dy*this.sig2i;
              }
           
              for( j=1;j<this.mfit;j++){
                for( k=0;k<j;k++){
                  this.alpha[k][j]=this.alpha[j][k]
                }
              } 

          };
            
          funcs1(){
                let i;
                this.ymod=0;
                let na=this.a.length
                for(i=0;i<na; i++){
                
                  this.ymod+=this.a[i]*this.xi
                  this.dyda[i]=this.x[i]
                  }
            };

          covsrtAlpha(){
                var k;
                for(let i=this.mfit;i<this.ma;i++){
                    for(let j=0;j<i+1;j++){
                      this.alpha[i][j]= this.alpha[j][i]=0;
                    }
                }
                k=this.mfit-1;
                for(let j=this.ma-1;j>=0;j--){
                  if(this.ia[j]){
                    for(let i=0;i<this.ma;i++){
                      let swap= this.alpha[i][j];      
                      this.alpha[i][j]=this.alpha[i][k];      
                      this.alpha[i][k]=swap;
                    }

                    for(let i=0;i<this.ma;i++){
                      let swap= this.alpha[j][i];
                      this.alpha[j][i]=this.alpha[k][i];
                      this.alpha[k][i]=swap;
                    }
                  
                  k--; 
                  }
                }    
          };
        
        mrqconf2(){
          let dy=0;
              let wt=0;
            for(let j=0;j<this.ma;j++){ 
              this.dyda[j]=1
              }
              
            for(let j=0;j<this.mfit;j++){ 
                if(!this.covar[j]){
                    this.covar[j]=[]
                }
                for(let k=0;k<=j;k++){
                    this.covar[j][k]=0
                }
                    this.da[j]=0
              }

            this.chisq=0;
            
            for(let i=0;i<this.ndat;i++){
                this.xi=this.x[i];  
                this.funcs2();
                
                this.sig2i=1.0/(this.sig[i]*this.sig[i])///sigma*2 
                dy=this.y[i]-this.ymod;

                for(let j=0, l=0;l<this.ma;l++){
                        if(this.ia[l]){
                          wt=this.dyda[l]*this.sig2i;                  
                          for(let k=0, m=0;m<l+1;m++){
                              if(this.ia[m]){  
                                  this.covar[j][k++] += wt*this.dyda[m]                  
                              }
                          }                  
                          this.da[j++]+=dy*wt;
                        }
                }
                this.chisq += dy*dy*this.sig2i;        
              } 
              
            for(let j=1;j<this.mfit;j++){    
                  for(let k=0;k<j;k++){

                    this.covar[k][j]=this.covar[j][k]
                  }
            }   
            
        };

      funcs2(){
          let i;
          let na=this.atry.length;
          this.ymod=0;
          
          for(i=0;i<na; i++){
            this.ymod+=this.atry[i]*this.xi
                this.dyda[i]=this.x[i]
                
            }
             
            
      };

      hold(i:number, val:number){
          this.ia[i]=false
          this.a[i]=val
      };
      
      free(i:number){
          this.ia[i]=true
      };
      
      covsrtCovar(){
            let i,j,k;
            for( i=this.mfit;i<this.ma;i++){
                for(let j=0;j<i+1;j++){
                  this.covar[i][j]=this.covar[j][i]=0.0;
                }
            }
          k=this.mfit-1;
          for( j=this.ma-1;j>=0;j--){
                if(this.ia[j]){

                        for(let i=0;i<this.ma;i++){
                            let swap= this.covar[i][j];
                            this.covar[i][j]=this.covar[i][k]; 
                            this.covar[i][k]=swap;
                        }

                          for(let i=0;i<this.ma;i++){
                            let swap= this.covar[j][i];
                            this.covar[j][i]=this.covar[k][i];
                            this.covar[k][i]=swap;
                        }
                        k--;
                  }
              }
      };
            
     gaussj(){

      let icol: number=0
      let irow: number=0
      var i,j,k,l;
      var big: number;
      var dum: number;
      var pivinv: number;
      let m=1;
      var n=this.temp.length;
      var indxc= new Array(n);
      var indxr= new Array(n);
      var ipiv= new Array(n);
      
      for(let j=0;j<n;j++){
        ipiv[j]=0;
        indxc[j]=0;
        indxr[j]=0;
      };

              for( i=0;i<n;i++){          
                  big=0.0;
                  for( j=0;j<n;j++){                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    if(ipiv[j] !== 1) {                                                                                                                                        
                      for( k=0;k<n;k++){ 
                          if(ipiv[k] == 0){ 
                            if(Math.abs(this.temp[j][k]) >= big){
                              big=Math.abs(this.temp[j][k]);
                              irow=j;
                              icol=k;        
                            }
                          }        
                      }
                  }             
                }
                       
                ++(ipiv[icol]);

                if(irow !== icol){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                      for( l=0;l<n;l++){
                        let swap= this.temp[irow][l];
                        this.temp[irow][l]=this.temp[icol][l];
                        this.temp[icol][l]=swap;
                      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                      for( l=0;l<m;l++){
                        let swap= this.oneda[irow][l];
                        this.oneda[irow][l]=this.oneda[icol][l];
                        
                        this.oneda[icol][l]=swap;      
                      }                  
                    }   

                    indxr[i]=irow;
                    indxc[i]=icol;
                    
                    if(this.temp[icol][icol]===0.0) {
                      break
                    }
                    
                    pivinv=1/this.temp[icol][icol];
                    this.temp[icol][icol]=1.0;
                    for( l=0;l<n;l++) {
                        this.temp[icol][l]*=pivinv;
                        
                    }
                    for( l=0;l<m;l++) {
                      this.oneda[icol][l]*=pivinv;                      
                     }
    
                    for(let ll=0;ll<n;ll++){
                      if(ll!==icol){
                        dum=this.temp[ll][icol];
                        this.temp[ll][icol]=0;
                        for( l=0;l<n;l++){
                               this.temp[ll][l] -=  this.temp[icol][l]*dum;                       
                        }
                        for( l=0;l<m;l++){
                          this.oneda[ll][l] -= this.oneda[icol][l]*dum;        
                                             
                        }
                                
                        }
                    }  
    
                    
            }                
    
            for(let l=n-1;l>=0;l--){
              if(indxr[l]!== indxc[l]){
                  for(let k=0;k<n;k++){
                      let swap= this.temp[k][indxr[l]]
                      this.temp[k][indxr[l]]=this.temp[k][indxc[l]]
                      this.temp[k][indxc[l]]=swap;
                }
              }
      }                                      
    
    }
    
  
}
