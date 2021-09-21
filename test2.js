async function thisThrows() {
    throw new Error("Thrown from thisThrows()");
}

async function myFunctionThatCatches() {
    // try {
        return await thisThrows();
    // } catch (e) {
    //     console.error(e);
    // console.log('here caught error in myFunctionThatCatches');
    //   throw e;
    // } finally {
    //     console.log('We do cleanup here');
    // }
    // return "Nothing found";
}

async function run() {
  try{
    const myValue = await myFunctionThatCatches();
    console.log(myValue);
  }catch(e){
    console.log(e);
    console.log('here caught error in run');
  }
}

run();
