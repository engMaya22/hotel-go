


// Get /api/users
export const getUserData = async(req , res)=>{

    try{
        const role = req.user.role;//where auth middleware have added the user data to request after check its authinticated
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success:true ,role ,recentSearchedCities});
         
    }
    catch (error) {
        res.json({success:false , message:error.message})

    
   }

}

//store recentSearchedCities for user 

export const storeRecentSearchedCities = async(req , res)=>{
   try {
    const {recentSearchedCities} = req.body;
    const user  = req.user;
    if(user.recentSearchedCities.length < 3)//allowed 3 max
    {
        user.recentSearchedCities.push(recentSearchedCities);
    }else{
        user.recentSearchedCities.shift();
        user.recentSearchedCities.push(recentSearchedCities);


    }
    user.save();
    res.json({success:true , message:"cities have been added"})
    
   } catch (error) {
    res.json({success:false , message:error.message})

   }

}