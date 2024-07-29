
const useProduct = (userId: string | null, token: string | null) => {

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
            "Token": `Bearer ${token}`,
        },
        body: JSON.stringify({id: productId}),
        });
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
 }
return {deleteProduct}

}

export default useProduct;