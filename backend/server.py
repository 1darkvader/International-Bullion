from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from typing import Optional
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Rock International Bullion API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/rock_bullion')
client = MongoClient(MONGO_URL)
db = client.rock_bullion

# Pydantic Models
class Lead(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    country: Optional[str] = None
    consultation_method: Optional[str] = None
    message: Optional[str] = None

class LeadResponse(BaseModel):
    id: str
    message: str

class Product(BaseModel):
    id: str
    name: str
    weight: str
    weight_unit: str
    purity: str
    certification: str
    description: str
    image_url: str
    category: str

class SpotPrice(BaseModel):
    gold_price_usd: float
    silver_price_usd: float
    last_updated: str
    currency: str

# Initialize products if not exists
def init_products():
    if db.products.count_documents({}) == 0:
        products = [
            {
                "id": str(uuid.uuid4()),
                "name": "1 Gram Gold Bar",
                "weight": "1",
                "weight_unit": "gram",
                "purity": "999.9",
                "certification": "LBMA Certified",
                "description": "Perfect entry point for new investors. LBMA-certified 1 gram fine gold bar with assay certificate.",
                "image_url": "https://images.unsplash.com/photo-1755728806854-5f1bb4824174?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYmFycyUyMGx1eHVyeXxlbnwwfHx8fDE3NjQ3ODU2ODh8MA&ixlib=rb-4.1.0&q=85&w=400",
                "category": "small"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "100 Gram Gold Bar",
                "weight": "100",
                "weight_unit": "gram",
                "purity": "999.9",
                "certification": "LBMA Certified",
                "description": "Popular choice for serious investors. Cast or minted 100g bar with full certification.",
                "image_url": "https://images.unsplash.com/photo-1755728806777-25a38d3fa9a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxnb2xkJTIwYmFycyUyMGx1eHVyeXxlbnwwfHx8fDE3NjQ3ODU2ODh8MA&ixlib=rb-4.1.0&q=85&w=400",
                "category": "medium"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "1 Kilogram Gold Bar",
                "weight": "1",
                "weight_unit": "kilogram",
                "purity": "999.9",
                "certification": "LBMA Certified",
                "description": "Premium investment bar for substantial holdings. Cast 1kg bar from accredited refinery.",
                "image_url": "https://images.unsplash.com/photo-1755728806819-26a994fae81a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxnb2xkJTIwYmFycyUyMGx1eHVyeXxlbnwwfHx8fDE3NjQ3ODU2ODh8MA&ixlib=rb-4.1.0&q=85&w=400",
                "category": "large"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "400 oz Good Delivery Bar",
                "weight": "400",
                "weight_unit": "troy oz",
                "purity": "995.0+",
                "certification": "LBMA Good Delivery",
                "description": "Institutional-grade London Good Delivery bar. The gold standard for central banks and major investors.",
                "image_url": "https://images.pexels.com/photos/8442328/pexels-photo-8442328.jpeg?auto=compress&cs=tinysrgb&w=400",
                "category": "institutional"
            }
        ]
        db.products.insert_many(products)

# Initialize on startup
@app.on_event("startup")
async def startup_event():
    init_products()

# Health Check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Rock International Bullion API"}

# Leads API
@app.post("/api/leads", response_model=LeadResponse)
async def create_lead(lead: Lead):
    try:
        lead_data = lead.dict()
        lead_data["id"] = str(uuid.uuid4())
        lead_data["created_at"] = datetime.utcnow().isoformat()
        lead_data["status"] = "new"
        
        db.leads.insert_one(lead_data)
        
        return LeadResponse(
            id=lead_data["id"],
            message="Thank you for your inquiry. Our team will contact you within 24 hours."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/leads")
async def get_leads():
    leads = list(db.leads.find({}, {"_id": 0}))
    return {"leads": leads, "total": len(leads)}

# Products API
@app.get("/api/products")
async def get_products():
    products = list(db.products.find({}, {"_id": 0}))
    return {"products": products}

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    product = db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Spot Price API (Placeholder - would integrate with real gold price API)
@app.get("/api/spot-price", response_model=SpotPrice)
async def get_spot_price():
    # Placeholder prices - in production, integrate with real gold price API
    return SpotPrice(
        gold_price_usd=2650.50,
        silver_price_usd=31.25,
        last_updated=datetime.utcnow().isoformat(),
        currency="USD"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
