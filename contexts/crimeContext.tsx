import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Simple ID generator that works in React Native
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export type Crime = {
  id: string;
  title: string;
  details: string;
  date: string;
  photo: string | null;
  solved: boolean;
};

type CrimeContextType = {
  crimes: Crime[];
  addCrime: (crime: Omit<Crime, "id">) => Promise<void>;
  updateCrime: (id: string, updates: Partial<Omit<Crime, "id">>) => Promise<void>;
  getCrimeById: (id: string) => Crime | undefined;
};

const CrimeContext = createContext<CrimeContextType | undefined>(undefined);
const CRIMES_STORAGE_KEY = "@criminal_intent_crimes";

// Initial sample data - only 3 crimes as requested
const getInitialCrimes = (): Crime[] => [
  {
    id: generateId(),
    title: "Test Crime 1",
    details: "Details about criminal activity 1",
    date: "2025-01-30T13:13:43.639Z",
    photo: null,
    solved: false,
  },
  {
    id: generateId(),
    title: "Test Crime 2",
    details: "Details about criminal activity 2",
    date: "2025-01-24T21:44:40.415Z",
    photo: null,
    solved: false,
  },
  {
    id: generateId(),
    title: "Test Crime 3",
    details: "Details about criminal activity 3",
    date: "2025-01-03T02:14:54.649Z",
    photo: null,
    solved: false,
  },
];

export const CrimeProvider = ({ children }: { children: ReactNode }) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);

  // Load crimes from AsyncStorage on app start
  useEffect(() => {
    loadCrimes();
  }, []);

  const loadCrimes = async () => {
    try {
      const storedCrimes = await AsyncStorage.getItem(CRIMES_STORAGE_KEY);
      if (storedCrimes) {
        const parsedCrimes = JSON.parse(storedCrimes);
        setCrimes(parsedCrimes);
        console.log("Loaded crimes from storage:", parsedCrimes.length);
      } else {
        // Initialize with sample data if no stored crimes
        const initialCrimes = getInitialCrimes();
        setCrimes(initialCrimes);
        await saveCrimesToStorage(initialCrimes);
        console.log("Initialized with sample crimes:", initialCrimes.length);
      }
    } catch (error) {
      console.error("Error loading crimes:", error);
      // Fallback to sample data if storage fails
      setCrimes(getInitialCrimes());
    }
  };

  const saveCrimesToStorage = async (updatedCrimes: Crime[]) => {
    try {
      await AsyncStorage.setItem(CRIMES_STORAGE_KEY, JSON.stringify(updatedCrimes));
      console.log("Saved crimes to storage:", updatedCrimes.length);
    } catch (error) {
      console.error("Error saving crimes:", error);
    }
  };

  const addCrime = async (crimeData: Omit<Crime, "id">) => {
    const newCrime: Crime = {
      ...crimeData,
      id: generateId(),
    };
    const updatedCrimes = [newCrime, ...crimes];
    setCrimes(updatedCrimes);
    await saveCrimesToStorage(updatedCrimes);
  };

  const updateCrime = async (id: string, updates: Partial<Omit<Crime, "id">>) => {
    const updatedCrimes = crimes.map((crime) =>
      crime.id === id ? { ...crime, ...updates } : crime
    );
    setCrimes(updatedCrimes);
    await saveCrimesToStorage(updatedCrimes);
  };

  const getCrimeById = (id: string): Crime | undefined => {
    return crimes.find((crime) => crime.id === id);
  };

  return (
    <CrimeContext.Provider
      value={{
        crimes,
        addCrime,
        updateCrime,
        getCrimeById,
      }}
    >
      {children}
    </CrimeContext.Provider>
  );
};

export const useCrime = () => {
  const context = useContext(CrimeContext);
  if (context === undefined) {
    throw new Error("useCrime must be used within a CrimeProvider");
  }
  return context;
};
