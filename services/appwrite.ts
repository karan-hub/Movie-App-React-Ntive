import { Movie } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE = process.env.EXPO_PUBLIC_APPWRITE_TABLE!;
const PROJECT = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

if (!DATABASE_ID || !TABLE || !PROJECT || !ENDPOINT) {
    console.table(DATABASE_ID , TABLE , PROJECT , ENDPOINT);
    
  throw new Error("Missing Appwrite environment variables");
}

if (!PROJECT) throw new Error("EXPO_PUBLIC_APPWRITE_PROJECT_ID is not set");
if (!ENDPOINT) throw new Error("EXPO_PUBLIC_APPWRITE_ENDPOINT is not set");

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT);

const database = new Databases(client);

 
export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE, [
            Query.equal('searchTerm', query)  
        ]);

        console.log('Found documents:', result.documents);

        if (result.documents.length > 0 ) {
            const  exitingMovie  = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                TABLE,
                exitingMovie.$id,
                {
                    count : exitingMovie.count+1
                }
            )

        }else{
            await database.createDocument(
                DATABASE_ID,
                TABLE,
                ID.unique() ,
                {
                    searchTerm : query,
                    movie_id : movie.imdbID,
                    count :1 ,
                    title: movie.Title,
                    poster: movie.Poster || "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg" // fallback poster

                }
                
            ) 
        }
         
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
};
